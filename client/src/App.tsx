import { useState } from 'react';


interface finalData {
  destination: string;
  summary: string;
  days: Array<{
    day: number;
    date: string;
    activities: Array<{
      time: string;
      title: string;
      duration: string;
      notes: string;
    }>;
    safety: string;
  }>;
  explanation: string[];
}

function App() {
  const [chunks, setChunks] = useState<any[]>([]);
  const [finalData, setFinalData] = useState<finalData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e : any) => {
    e.preventDefault();
    setLoading(true);
    setChunks([]);
    setFinalData(null);
    setError(null);

    const formData = new FormData(e.target);

    try {
      const response = await fetch('http://localhost:4000/api/v1/ai/generate-response', {
        method: 'POST',
        body: formData,
      });

      const reader = response?.body?.getReader();
      const decoder = new TextDecoder();
      let buffer = '';
      let accumulatedText = '';

      while (true) {
        const { done , value }:any = await reader?.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = JSON.parse(line.slice(6));

            if (data.chunk) {
              accumulatedText += data.chunk;
              setChunks((prev) => [...prev, data.chunk]);
              // Optional: try to parse partial JSON for progressive rendering
              try {
                const partial = JSON.parse(accumulatedText);
                setFinalData(partial); // Update UI with partial valid JSON
              } catch {
                // Not yet valid JSON, keep accumulating
              }
            }

            if (data.done) {
              setFinalData(data.data);
              setLoading(false);
              return;
            }

            if (data.error) {
              setError(data.error);
              setLoading(false);
              return;
            }
          }
        }
      }
    } catch (err:any) {
      setError(err.message);
      setLoading(false);
    }
  };
console.log(finalData)
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input name="destination" placeholder="Destination" required />
        <input name="start_date" type="date" required />
        <input name="end_date" type="date" required />
        <input name="intrests" placeholder="Interests (comma separated)" required />
        <textarea name="travellers" placeholder='{"adults": 2, "children": 0}' />
        <input name="budget" type="number" placeholder="Budget (INR)" />
        <button type="submit" disabled={loading}>
          {loading ? 'Generating...' : 'Generate Itinerary'}
        </button>
      </form>

      {loading && (
        <div>
          <h3>Streaming Response:</h3>
          <pre>{chunks.join('')}</pre>
        </div>
      )}

      {error && <div style={{ color: 'red' }}>Error: {error}</div>}

      {finalData && (
        <div>
          <h2>Itinerary for {finalData?.destination}</h2>
          <p>{finalData.summary}</p>
          
          {finalData.days?.map(day => (
            <div key={day.day}>
              <h3>Day {day.day} - {day.date}</h3>
              {day.activities?.map((activity, idx) => (
                <div key={idx}>
                  <strong>{activity.time}</strong>: {activity.title} 
                  ({activity.duration}) - {activity.notes}
                </div>
              ))}
              <p><em>Safety: {day.safety}</em></p>
            </div>
          ))}

          <h3>Why this itinerary?</h3>
          <ul>
            {finalData.explanation?.map((exp, idx) => (
              <li key={idx}>{exp}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;