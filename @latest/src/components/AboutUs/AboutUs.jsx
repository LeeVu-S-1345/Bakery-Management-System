import "./AboutUs.css";

export default function AboutUs() {
  return (
    <section className="aboutUs">
      <div className="aboutUs__media">
        <img src="/images/about.png" alt="Cakes" />
      </div>

      <div className="aboutUs__content">
        <h2 className="aboutUs__title">About Us</h2>
        <p className="aboutUs__text">
          At Savor Cake, we believe every cake tells a story of love and
          happiness. We use the freshest ingredients, craft each design with
          care, and deliver sweetness that brightens every celebration.
        </p>
      </div>
    </section>
  );
}

