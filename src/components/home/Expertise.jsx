import { FiEye, FiLayers, FiLayout, FiServer, FiShoppingBag, FiZap } from "react-icons/fi";
import { expertise } from "@/data/skills";

const icons = {
  wordpress: FiLayout,
  layers: FiLayers,
  performance: FiZap,
  commerce: FiShoppingBag,
  accessibility: FiEye,
  architecture: FiServer,
};

export default function Expertise() {
  return (
    <section id="expertise" className="section expertise-section" aria-labelledby="expertise-title">
      <div className="container">
        <div className="section-heading section-heading-split">
          <div>
            <p className="eyebrow">02 / CORE EXPERTISE</p>
            <h2 id="expertise-title" className="section-title">From first impression.<br />To lasting performance.</h2>
          </div>
          <p className="section-intro">From a first impression to the systems behind it, I bring a practical understanding of what makes a website work.</p>
        </div>
        <div className="expertise-grid">
          {expertise.map((item, index) => {
            const Icon = icons[item.icon] || FiLayers;
            return (
              <article className="expertise-card" key={item.title}>
                <div className="expertise-card-top">
                  <span className="expertise-icon"><Icon aria-hidden="true" /></span>
                  <span className="item-number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                </div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
