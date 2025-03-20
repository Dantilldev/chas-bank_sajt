import React from "react";
import Card from "./Card";

export default function CardSection() {
  return (
    <section className="flex justify-center items-center py-16 px-4 md:px-8">
      <div className="flex flex-wrap justify-center items-center gap-8   ">
        <Card
          image="/pik1.jpg"
          alt="Secure banking"
          title="Security First"
          text="We provide top-tier security for your banking transactions and savings."
        />
        <Card
          image="/pik2.jpg"
          alt="Easy transfer"
          s
          title="Fast Transfers"
          text="Send and receive money quickly and effective, wherever you are."
        />
        <Card
          image="/pik3.jpg"
          alt="Customer support"
          title="Customer Support"
          text="Our support team is available 24/7."
        />
      </div>
    </section>
  );
}
