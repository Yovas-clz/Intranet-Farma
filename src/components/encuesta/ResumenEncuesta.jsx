export default function ResumenEncuesta({ surveyResponses }) {
  return (
    <div className="survey-resumen">
      <h3>Resumen de respuestas</h3>

      {surveyResponses.length === 0 ? (
        <p>Aún no hay respuestas.</p>
      ) : (
        <div className="survey-stats">

          <div className="stat">
            <strong>Total:</strong> {surveyResponses.length}
          </div>

          <div className="stat">
            <strong>Promedio:</strong>{" "}
            {(
              surveyResponses.reduce((a, b) => a + b, 0) /
              surveyResponses.length
            ).toFixed(2)}
          </div>

          <div className="stat-grid">
            {[1, 2, 3, 4, 5].map((v) => (
              <div key={v} className="stat-box">
                {v}: {surveyResponses.filter((x) => x === v).length}
              </div>
            ))}
          </div>

        </div>
      )}
    </div>
  );
}