import { stats } from "@/data/site";

export default function Stats() {
  return (
    <section
      className="stats-section"
      aria-label="Professional experience at a glance"
    >
      <div className="container stats-grid">
        {stats.map((stat) => (
          <div className="stat" key={stat.label}>
            <strong>{stat.value}</strong>
            <p>{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
