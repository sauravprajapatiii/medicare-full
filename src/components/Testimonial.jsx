import React, { useEffect, useRef, useState } from "react";
import { testimonialStyles as ts } from "../assets/dummyStyles";
import { Star } from "lucide-react";
const Testimonial = () => {
  const scrollRefLeft = useRef(null);
  const scrollRefRight = useRef(null);
  const [isPaused, setIsPaused] = useState(false);

  const testimonials = [
    {
      id: 1,
      name: "Dr. Ananya Sharma",
      role: "Cardiologist",
      rating: 5,
      text: "The appointment booking system is extremely efficient. It saves a lot of time and helps me focus more on patient care.",
      image:
        "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=400&q=80",
      type: "doctor",
    },
    {
      id: 2,
      name: "Rahul Patel",
      role: "Patient",
      rating: 5,
      text: "Booking appointments is now very simple. The interface is smooth and reminders are really helpful.",
      image:
        "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=400&q=80",
      type: "patient",
    },
    {
      id: 3,
      name: "Dr. Arjun Mehta",
      role: "Pediatrician",
      rating: 4,
      text: "This platform has improved our clinic workflow a lot. Managing patients is now much more organized.",
      image:
        "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=400&q=80",
      type: "doctor",
    },
    {
      id: 4,
      name: "Priya Verma",
      role: "Patient",
      rating: 5,
      text: "24/7 online booking is very convenient. Getting instant confirmation gives me peace of mind.",
      image:
        "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=400&q=80",
      type: "patient",
    },
    {
      id: 5,
      name: "Dr. Neha Reddy",
      role: "Dermatologist",
      rating: 5,
      text: "A very useful platform for managing appointments. Automated reminders have reduced no-shows significantly.",
      image:
        "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=400&q=80",
      type: "doctor",
    },
    {
      id: 6,
      name: "Amit Kumar",
      role: "Patient",
      rating: 5,
      text: "Waiting time has reduced a lot after using this system. It’s very user-friendly and convenient.",
      image:
        "https://images.unsplash.com/photo-1502767089025-6572583495b0?auto=format&fit=crop&w=400&q=80",
      type: "patient",
    },
  ];

  const leftTestimonials = testimonials.filter((t) => t.type === "doctor");
  const rightTestimonials = testimonials.filter((t) => t.type === "patient");

  useEffect(() => {
    const scrollLeft = scrollRefLeft.current;
    const scrollRight = scrollRefRight.current;
    if (!scrollLeft || !scrollRight) return;

    let scrollSpeed = 0.5; // preserved animation speed
    let rafId;

    const smoothScroll = () => {
      if (!isPaused) {
        scrollLeft.scrollTop += scrollSpeed;
        scrollRight.scrollTop -= scrollSpeed;

        // seamless infinite loop
        if (scrollLeft.scrollTop >= scrollLeft.scrollHeight / 2) {
          scrollLeft.scrollTop = 0;
        }
        if (scrollRight.scrollTop <= 0) {
          scrollRight.scrollTop = scrollRight.scrollHeight / 2;
        }
      }
      rafId = requestAnimationFrame(smoothScroll);
    };

    rafId = requestAnimationFrame(smoothScroll);
    return () => cancelAnimationFrame(rafId);
  }, [isPaused]);

  const renderStars = (rating) =>
    Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={i < rating ? ts.activeStar : ts.inactiveStar}>
        <Star className={ts.star} />
      </span>
    ));

  const TestimonialCard = ({ testimonial, direction }) => (
    <div
      className={`${ts.testimonialCard} ${
        direction === "left" ? ts.leftCardBorder : ts.rightCardBorder
      }`}
    >
      <div className={ts.cardContent}>
        <img
          src={testimonial.image}
          alt={testimonial.name}
          className={ts.avatar}
        />
        <div className={ts.textContainer}>
          <div className={ts.nameRoleContainer}>
            <div>
              <h4
                className={`${ts.name} ${
                  direction === "left" ? ts.leftName : ts.rightName
                }`}
              >
                {testimonial.name}
              </h4>
              <p className={ts.role}>{testimonial.role}</p>
            </div>
            <div className={ts.starsContainer}>
              {renderStars(testimonial.rating)}
            </div>
          </div>

          <p className={ts.quote}>"{testimonial.text}"</p>

          {/* Stars on small screens beneath text */}
          <div className={ts.mobileStarsContainer}>
            {renderStars(testimonial.rating)}
          </div>
        </div>
      </div>
    </div>
  );
  return (
    <div className={ts.container}>
      <div className={ts.headerContainer}>
        <h2 className={ts.title}>Voices of trust</h2>
        <p className={ts.subtitle}>
          Real stories from doctors and patients sharing their positive
          experience with our healthcare platform.
        </p>
      </div>
      <div
        className={ts.grid}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className={`${ts.columnContainer} ${ts.leftColumnBorder}`}>
          <div className={`${ts.columnHeader} ${ts.leftColumnHeader}`}>
            👩‍⚕️ Medical Professionals
          </div>
          <div
            onTouchStart={() => setIsPaused(true)}
            onTouchEnd={() => setIsPaused(false)}
            ref={scrollRefLeft}
            className={ts.scrollContainer}
          >
            {[...leftTestimonials, ...leftTestimonials].map((t, i) => (
              <TestimonialCard
                key={`L-${i}`}
                testimonial={t}
                direction="left"
              />
            ))}
          </div>
        </div>
        <div className={`${ts.columnContainer} ${ts.rightColumnBorder}`}>
          <div className={`${ts.columnHeader} ${ts.rightColumnHeader}`}>
            🧑‍💼 Patients
          </div>
          <div
            ref={scrollRefRight}
            className={ts.scrollContainer}
            onTouchStart={() => setIsPaused(true)}
            onTouchEnd={() => setIsPaused(false)}
          >
            {[...rightTestimonials, ...rightTestimonials].map((t, i) => (
              <TestimonialCard
                key={`R-${i}`}
                testimonial={t}
                direction="right"
              />
            ))}
          </div>
        </div>
      </div>
      <style>{ts.animationStyles}</style>
    </div>
  );
};

export default Testimonial;
