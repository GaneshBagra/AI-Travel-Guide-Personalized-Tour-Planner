import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/async-handler.js";
import { GoogleGenAI, Type } from "@google/genai";
import { getForecastForDate, getImageFromUnsplash } from "../utils/weatherAPi.service.js";

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
 


  try {
    const aiResponse = await ai.models.generateContent({
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
                        bestTimeToVisit: { 
                          type: Type.STRING,
                          description: "Best time to visit the place/attraction (e.g., 'Early morning to avoid crowds')"
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

    let fullText = aiResponse?.text || aiResponse?.output_text || JSON.stringify(aiResponse);
    const parsedData = JSON.parse(fullText);

    const daysWithExtras = await Promise.all(
      parsedData.days.map(async (day) => {
        const targetDate = day.date;

        // Enrich each activity: image + weather for its time
        const activities = await Promise.all(
          (day.activities || []).map(async (act) => {
            const placeQuery = act.placeName || act.title || parsedData.destination;
            const [img, actWeather] = await Promise.all([
              getImageFromUnsplash(placeQuery).catch(() => null),
              getForecastForDate(placeQuery, targetDate, act.time).catch(() => null)
            ]);

            return {
              ...act,
              PublicImageURL: img || act.PublicImageURL || null,
              weather: actWeather || { note: "Weather unavailable for activity time" }
            };
          })
        );

        // Optionally keep day-level weather as well
        const dayPlaceQuery = (day.activities && day.activities[0]?.placeName) || parsedData.destination;
        const dayWeather = await getForecastForDate(dayPlaceQuery, targetDate).catch(() => null);

        return {
          ...day,
          activities,
          placeQueried: dayPlaceQuery,
          weather: dayWeather || { note: "Weather unavailable or date out of range" }
        };
      })
    );

    const finalData = { ...parsedData, days: daysWithExtras };
    res.status(200).json({ done: true, data: finalData });

  } catch (error) {
    console.error("Itinerary error:", error);
    res.status(500).json({ error: String(error.message || error) });
  }
});

export { getItinaryResult };
