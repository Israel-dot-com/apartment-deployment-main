import { Helmet, HelmetProvider } from "react-helmet-async";
import Navbar from "../../components/Navbar"
import Footer from "../../components/footer"
import HomepageBooking from "../../layouts/carBookings"
import SecondLayout from "../../layouts/CarSecondLayout"


const HomePage = () => {
  return (
    <>
      <HelmetProvider>
        <Helmet>
          {/* SEO Optimized Title */}
          <title>Smash Apartments | Premium Apartment Rentals Across Nigeria - Your Peace, Our Promise</title>
          
          {/* SEO Optimized Meta Description */}
          <meta
            name="description"
            content="Find your perfect apartment across Nigeria with Smash Apartments. Premium rentals in Lagos, Abuja, Port Harcourt & more. Peaceful living and exceptional service nationwide. Browse available apartments today!"
          />
          
          {/* Updated Keywords for Apartment Rentals */}
          <meta
            name="keywords"
            content="apartment rentals Nigeria, rent apartment Lagos, apartments for rent Abuja, Port Harcourt apartments, premium apartments Nigeria, furnished apartments Lagos, peaceful living Nigeria, quality apartments, apartment rental services, Nigeria property rentals, Lagos apartments, Abuja rentals, Nigerian real estate"
          />
          
          {/* Author and Publisher */}
          <meta name="author" content="Smash Apartments" />
          <meta name="publisher" content="Smash Apartments" />
          
          {/* Robots Meta Tag */}
          <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
          
          {/* Open Graph Tags for Social Media */}
          <meta property="og:title" content="Smash Apartments | Premium Apartment Rentals Across Nigeria" />
          <meta
            property="og:description"
            content="Discover premium apartment rentals across Nigeria. Quality homes in Lagos, Abuja, Port Harcourt & more. Your Peace, Our Promise."
          />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://www.smashapartments.com" />
          <meta property="og:image" content="https://www.smashapartments.com/assets/apartment-hero.jpg" />
          <meta property="og:image:alt" content="Beautiful apartment interior at Smash Apartments Abuja" />
          <meta property="og:site_name" content="Smash Apartments" />
          <meta property="og:locale" content="en_NG" />
          
          {/* Twitter Card Tags */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Smash Apartments | Premium Apartment Rentals Across Nigeria" />
          <meta
            name="twitter:description"
            content="Find your perfect apartment across Nigeria with Smash Apartments. Quality rentals in Lagos, Abuja, Port Harcourt & more."
          />
          <meta
            name="twitter:image"
            content="https://www.smashapartments.com/assets/apartment-hero.jpg"
          />
          <meta name="twitter:image:alt" content="Beautiful apartment interior at Smash Apartments Abuja" />
          <meta name="twitter:site" content="@smashapartments" />
          <meta name="twitter:creator" content="@smashapartments" />
          
          {/* Canonical URL */}
          <link rel="canonical" href="https://www.smashapartments.com/" />
          
          {/* Additional SEO Meta Tags */}
          <meta name="geo.region" content="NG-FC" />
          <meta name="geo.placename" content="Abuja" />
          <meta name="geo.position" content="9.1579;7.4951" />
          <meta name="ICBM" content="9.1579, 7.4951" />
          
          {/* Schema.org JSON-LD for Real Estate Agent */}
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "RealEstateAgent",
              "name": "Smash Apartments",
              "image": "https://www.smashapartments.com/logo.svg",
              "logo": "https://www.smashapartments.com/logo.svg",
              "url": "https://www.smashapartments.com/",
              "telephone": "+2348100693634",
              "description": "Premium apartment rentals across Nigeria offering quality homes and peaceful living experiences in major cities including Lagos, Abuja, Port Harcourt, and more. Your Peace, Our Promise.",
              "slogan": "Your Peace, Our Promise",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "2 King Jaja Street, Works & Housing, 3rd Avenue, Gwarinpa",
                "addressLocality": "Abuja",
                "addressRegion": "FCT",
                "postalCode": "900108",
                "addressCountry": "NG"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": "9.1579",
                "longitude": "7.4951"
              },
              "areaServed": [
                {
                  "@type": "Country",
                  "name": "Nigeria"
                },
                {
                  "@type": "City",
                  "name": "Lagos"
                },
                {
                  "@type": "City",
                  "name": "Abuja"
                },
                {
                  "@type": "City",
                  "name": "Port Harcourt"
                },
                {
                  "@type": "City",
                  "name": "Kano"
                },
                {
                  "@type": "City",
                  "name": "Ibadan"
                }
              ],
              "serviceType": [
                "Apartment Rental Services",
                "Property Management",
                "Real Estate Consultation"
              ],
              "priceRange": "₦₾₾₾",
              "openingHours": "Mo-Su 08:00-20:00",
              "sameAs": [
                "https://www.facebook.com/smashapartments",
                "https://www.instagram.com/smashapartments",
                "https://www.twitter.com/smashapartments"
              ]
            })}
          </script>
          
          {/* Website Schema */}
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Smash Apartments",
              "url": "https://www.smashapartments.com",
              "potentialAction": {
                "@type": "SearchAction",
                "target": {
                  "@type": "EntryPoint",
                  "urlTemplate": "https://www.smashapartments.com/search?q={search_term_string}"
                },
                "query-input": "required name=search_term_string"
              }
            })}
          </script>
          
          {/* Breadcrumb Schema */}
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "Home",
                  "item": "https://www.smashapartments.com/"
                }
              ]
            })}
          </script>
        </Helmet>

        <div>
          <Navbar/>
        </div>

        <div className="mx-[15px] md:mx-[32px] mt-[6.5rem]">
          <HomepageBooking/>
        </div>

        <div className="mx-[15px] md:mx-[32px] my-[2rem]">
<SecondLayout/>
        </div>


 <div>
          <Footer/>
        </div>
 
      </HelmetProvider>
    </>
  );
};

export default HomePage;