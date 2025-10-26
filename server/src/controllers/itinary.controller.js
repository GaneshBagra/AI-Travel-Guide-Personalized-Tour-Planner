import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/async-handler.js";
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({});

const getItinaryResult = asyncHandler(async (req, res) => {
  if (req.body === null || req.body === undefined) {
    throw new ApiError(400, "Request body is required");
  }

  const { destination, start_date, end_date, intrests, travellers, budget } =
    req.body;

  if (!destination || !start_date || !end_date || !intrests) {
    throw new ApiError(
      400,
      "destination, start_date, end_date and intrests are required"
    );
  }
  // check end_date is after start_date
  if (new Date(end_date) <= new Date(start_date)) {
    throw new ApiError(400, "end_date must be after start_date");
  }

  // calculate number of days
  const numberOfDays = Math.ceil(
    (new Date(end_date) - new Date(start_date)) / (1000 * 60 * 60 * 24)
  );

  const intrestArr = Array.isArray(intrests) ? intrests : intrests.split(",").map((i) => i.trim());

  const interestsText = intrestArr.length
    ? intrestArr.join(", ")
    : "general sightseeing and local culture";
  const travellersText = `Travellers: ${JSON.stringify(travellers)}`;
  const budgetText = budget ? `Budget: ${budget} INR` : 'No strict budget provided';
 




  // Set headers for SSE
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  try {
    // Use generateContentStream for streaming
    const streamResponse = await ai.models.generateContentStream({
      model: "gemini-2.5-pro",
      contents: `You are a travel planner. Create a day-by-day itinerary for a trip with the following details:
- Destination: ${destination}
- Start date: ${start_date}
- End date: ${end_date}
- Number of days (inclusive): ${numberOfDays}
- Interests: ${interestsText}
- ${travellersText}
- ${budgetText}

**IMPORTANT**: 
- For each activity, provide the EXACT name of the place/attraction to visit (e.g., "Eiffel Tower", "Louvre Museum", "Central Park").
- Include specific location names, not generic descriptions.
- The "placeName" field must contain the real, searchable name of the venue/attraction.

Return only valid JSON. Do not include any extra commentary or markdown. The JSON must exactly follow this schema`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            destination: { 
              type: Type.STRING,
              description: "The destination city/country name"
            },
            days: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  day: { type: Type.NUMBER },
                  date: { type: Type.STRING },
                  activities: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        time: { 
                          type: Type.STRING,
                          description: "Time of day (e.g., Morning, 9:00 AM)"
                        },
                        placeName: { 
                          type: Type.STRING,
                          description: "EXACT name of the place/attraction to visit should not include any extra information for eg if place is Eiffel Tower just write Eiffel Tower and not Eiffel Tower, Paris"
                        },
                        title: { 
                          type: Type.STRING,
                          description: "Short activity description"
                        },
                        PublicImageURL: { 
                          type: Type.STRING,
                          description: "URL to a representative image (can be placeholder if unknown)"
                        },
                        duration: { 
                          type: Type.STRING,
                          description: "Estimated time to spend (e.g., '2 hours', '3-4 hours')"
                        },
                        notes: { 
                          type: Type.STRING,
                          description: "Additional tips, entry fees, or recommendations"
                        },
                      },
                      required: ["time", "placeName", "title", "duration", "notes"],
                      propertyOrdering: ["time", "placeName", "title", "PublicImageURL", "duration", "notes"],
                    },
                  },
                  safety: { 
                    type: Type.STRING,
                    description: "Safety tips or considerations for this day"
                  },
                },
                required: ["day", "date", "activities"],
                propertyOrdering: ["day", "date", "activities", "safety"],
              },
            },
            summary: { 
              type: Type.STRING,
              description: "Brief overview of the entire trip"
            },
            explanation: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "List of reasons why specific places/activities were chosen"
            },
          },
          required: ["destination", "days", "summary", "explanation"],
          propertyOrdering: ["destination", "days", "summary", "explanation"],
        },
      },
    });

    let fullText = "";

    // Stream chunks to client
    for await (const chunk of streamResponse) {
      const chunkText = chunk.text;
      fullText += chunkText;
      
      // Send as SSE event
      res.write(`data: ${JSON.stringify({ chunk: chunkText })}\n\n`);
    }

    // Send final complete JSON
    try {
      const parsedData = JSON.parse(fullText);
      res.write(`data: ${JSON.stringify({ done: true, data: parsedData })}\n\n`);
    } catch (error) {
      res.write(`data: ${JSON.stringify({ error: "Invalid JSON from AI" })}\n\n`);
    }

    res.end();

  } catch (error) {
    console.error("Streaming error:", error);
    res.write(`data: ${JSON.stringify({ error: error.message })}\n\n`);
    res.end();
  }
});

export { getItinaryResult };
