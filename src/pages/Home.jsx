


function Home() {
  return (
    <div className="home-page">

      {/* MAIN HERO SECTION */}
      <div className="home-content">
        <h1>Welcome to Fashion Hub</h1>

        <p className="home-tagline">
          Discover Your Style
        </p>

        <p className="home-description">
          Explore timeless elegance, beautiful collections
          and the latest fashion trends.
        </p>

        <img
          className="home-image"
          src="https://i.pinimg.com/736x/76/4a/62/764a628f14f966a02ebc9fee8171d12c.jpg"
          alt="Fashion Hub Collection"
        />
      </div>

      {/* STYLE COLLECTION SECTION */}
      <section className="style-section">

        <h2>A Style for Every Moment</h2>

        <p className="section-description">
          Fashion is more than clothing. It's a way
          to express who you are.
        </p>

        <div className="style-grid">

          {/* FIRST CARD - MEN'S WEAR */}
          <div className="style-box">
            <img
              className="style-image"
              src="https://i.pinimg.com/236x/dd/fc/3d/ddfc3d742c42005caf6b077da6b774e5.jpg"
              alt="Men's wear"
            />
            <h3>Everyday Elegance</h3>
            <p>
              Discover comfortable and stylish
              outfits for your everyday look.
            </p>
          </div>

          {/* SECOND CARD - TRADITIONAL WEAR */}
          <div className="style-box">
            <img
              className="style-image"
              src="https://i.pinimg.com/736x/a7/61/fe/a761fee1b7dd005ca4d7f9567276b605.jpg"
              alt="Traditional wear"
            />
            <h3>Traditional Charm</h3>
            <p>
              Explore beautiful ethnic styles
              with a timeless touch.
            </p>
          </div>

          {/* THIRD CARD - WOMEN'S AESTHETIC FASHION */}
          <div className="style-box">
            <img
              className="style-image"
              src="https://i.pinimg.com/736x/81/dc/87/81dc87b186504485e55d65ee533d57b5.jpg"
              alt="Women's aesthetic fashion"
            />
            <h3>Complete Your Look</h3>
            <p>
              Find fashionable accessories
              to complement your outfit.
            </p>
          </div>

        </div>
      </section>

      {/* WHY FASHION HUB SECTION */}
      <section className="why-section">

        <h2>Why Explore Fashion Hub?</h2>

        <p className="section-description">
          Your style journey begins with the
          perfect collection.
        </p>

        <div className="why-grid">

          <div className="why-box">
            <span>✧</span>
            <h3>Trending Styles</h3>
            <p>
              Explore fresh and fashionable
              collections.
            </p>
          </div>

          <div className="why-box">
            <span>♡</span>
            <h3>Styles You Love</h3>
            <p>
              Discover outfits that match
              your personality.
            </p>
          </div>

          <div className="why-box">
            <span>◇</span>
            <h3>Fashion Variety</h3>
            <p>
              Explore clothing and accessories
              in one place.
            </p>
          </div>

          <div className="why-box">
            <span>✿</span>
            <h3>Express Yourself</h3>
            <p>
              Create your own look with
              confidence and creativity.
            </p>
          </div>

        </div>
      </section>

      {/* FINAL QUOTE SECTION */}
      <section className="fashion-quote">
        <h2>
          Style is a Way to Say Who You Are
        </h2>

        <p>
          Be Elegant. Be Confident. Be Yourself.
        </p>
      </section>

    </div>
  );
}

export default Home;
