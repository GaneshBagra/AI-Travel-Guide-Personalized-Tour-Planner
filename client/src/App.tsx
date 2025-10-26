import { useState } from 'react';


interface Activity {
  time: string;
  title: string;
  duration: string;
  notes: string;
  placeName?: string;
  PublicImageURL?: string;
  // optional: weather/image added by backend
  weather?: any;
  image?: string | null;
}

interface Day {
  day: number;
  date: string;
  activities: Activity[];
  safety?: string;
  placeQueried?: string;
  weather?: any;
  image?: string | null;
}

interface finalData {
  destination: string;
  summary: string;
  days: Day[];
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
      // Non-streaming request: backend responds with { done: true, data: finalData }
      const response = await fetch('http://localhost:4000/api/v1/ai/generate-response', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const text = await response.text().catch(() => '');
        throw new Error(`Server returned ${response.status}: ${text}`);
      }

      const body = await response.json().catch(() => null);
      if (!body) throw new Error('Invalid JSON response from server');

      // backend returns { done: true, data: finalData }
      if (body.done && body.data) {
        setFinalData(body.data);
      } else if (body.data) {
        setFinalData(body.data);
      } else {
        throw new Error('Unexpected response shape from server');
      }

      setLoading(false);
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
          
          {finalData.days?.map((day) => (
            <div key={day.day} style={{border: '1px solid #ddd', padding: 12, marginBottom: 12}}>
              <h3>Day {day.day} - {day.date}</h3>

              {day.placeQueried && <div style={{marginBottom:8}}><strong>Place:</strong> {day.placeQueried}</div>}

              {day.image && (
                <div style={{marginBottom:8}}>
                  <img src={day.image} alt={day.placeQueried || 'place image'} style={{maxWidth: 420, width: '100%', height: 'auto', borderRadius: 6}} />
                </div>
              )}

              {day.weather && (
                <div style={{marginBottom:8}}>
                  <strong>Day weather:</strong> {day.weather.day?.condition || day.weather.note}
                  {day.weather.day?.maxtemp_c !== undefined && (
                    <span> — {day.weather.day.maxtemp_c}°C / {day.weather.day.mintemp_c}°C</span>
                  )}
                </div>
              )}

              {day.activities?.map((activity, idx) => (
                <div key={idx} style={{display: 'flex', gap: 12, marginBottom: 12, alignItems: 'flex-start'}}>
                  <div style={{width: 140, flexShrink: 0}}>
                    { (activity.PublicImageURL || activity.image) ? (
                      <img src={activity.PublicImageURL || activity.image || ''} alt={activity.placeName || activity.title} style={{width: '100%', height: 'auto', borderRadius: 6}} />
                    ) : (
                      <div style={{width: '100%', height: 90, background: '#eee', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#666'}}>No image</div>
                    ) }
                  </div>

                  <div style={{flex: 1}}>
                    <div><strong>{activity.time}</strong> — <strong>{activity.title}</strong></div>
                    <div style={{color: '#444'}}>{activity.placeName ? <em>{activity.placeName}</em> : null}</div>
                    <div style={{marginTop:6}}>{activity.duration} • {activity.notes}</div>

                    {activity.weather && (
                      <div style={{marginTop:8, color:'#333'}}>
                        <strong>Time weather:</strong> {activity.weather.condition || activity.weather.note}
                        {activity.weather.temp_c !== undefined && (
                          <span> — {activity.weather.temp_c}°C</span>
                        )}
                        {activity.weather.icon && (
                          <img src={activity.weather.icon} alt="weather" style={{width:24, height:24, verticalAlign:'middle', marginLeft:8}} />
                        )}
                      </div>
                    )}
                  </div>
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