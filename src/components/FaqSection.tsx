"use client";

import React, { useState } from "react";
import Image from "next/image";
import img from "@/assets/Education.png";

interface FAQItemProps {
  id: string;
  question: string; 
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}

const FAQItem = ({ id, question, answer, isOpen, onClick }: FAQItemProps) => {
  return (
    <div className="border-b border-gray-200">
      <button
        type="button"
        className="flex justify-between items-center py-5 w-full text-xl cursor-pointer text-left"
        onClick={onClick}
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${id}`}
      >
        <div
          className={`font-Gotham ${
            isOpen ? "text-[#54B0AF] font-semibold" : "text-zinc-800"
          }`}
        >
          <strong>{question}</strong>
        </div>
        {isOpen ? (
          <span
            className="text-2xl font-light text-zinc-500"
            aria-hidden="true"
          >
            ×
          </span>
        ) : (
          <span
            className="text-2xl font-medium text-zinc-500"
            aria-hidden="true"
          >
            +
          </span>
        )}
        <span className="sr-only">{isOpen ? "Collapse" : "Expand"}</span>
      </button>
      {isOpen && (
        <div
          id={`faq-answer-${id}`}
          className="pb-5 text-lg leading-7 text-zinc-700 font-Gotham"
        >
          {answer}
        </div>
      )}
    </div>
  );
};

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      id: "why-questions",
      question: "Why does Stocai ask many questions?",
      answer:
        "Great insights start with great questions. Stocai is designed to guide your introspection by prompting you to think deeper and uncover what's beneath the surface. The right questions help you move beyond quick fixes and discover solutions that truly fit you.",
    },
    {
      id: "repeat-statements",
      question: "Why does it repeat my statements?",
      answer:
        "Repeating your statements helps in two ways: it confirms that Stocai has understood you correctly, and it gives you a chance to hear your own thoughts reflected back, which often leads to deeper insights and clarity.",
    },
    {
      id: "response-time",
      question: "Why does it take time to respond?",
      answer:
        "Stocai is designed to be thoughtful rather than reactive. The slight delay gives you space to reflect on what you've shared and allows Stocai to craft responses that are more meaningful and personalized to your situation.",
    },
    {
      id: "different-coaching",
      question: "How is Stocai different from traditional human coaching?",
      answer:
        "While Stocai is built on coaching principles, it offers unique advantages: it's available 24/7, completely private, and consistently applies proven coaching techniques. It's not meant to replace human coaches but to make coaching insights accessible to everyone.",
    },
    {
      id: "better-usage",
      question: "How do I use it better?",
      answer:
        "Be honest and specific about your situation. Take time to reflect on the questions Stocai asks rather than rushing to answer. And remember, the more you engage with the process, the more valuable insights you'll gain.",
    },
    {
      id: "privacy-protection",
      question:
        "I'm afraid to share my personal challenges. How is my privacy protected?",
      answer:
        "Your privacy is our top priority. All conversations are encrypted, and we have strict data protection policies in place. Your personal information is never shared with third parties, and you can delete your data at any time.",
    },
  ];

  return (
    <section
      id="faq"
      className="flex flex-col items-center px-4 py-16 max-w-5xl mx-auto"
    >
      <h2 className="text-4xl md:text-5xl font-bold text-center font-quattrocento  mt-[4rem] lg:mt-[4rem]">
        Frequently asked questions
      </h2>
      <p className="mt-4 text-xl text-center text-zinc-700 font-Gotham">
        Stocai is all about <strong>&apos;Power of a Question&apos;</strong>, These are
        yours.
      </p>

      <div className="flex flex-col md:flex-row w-full mt-2 md:mt-12 gap-10">
        <div className="md:w-1/3">
          <Image
            src={img}
            alt="Two people discussing questions and answers"
            className="max-w-full"
            width={400}
            height={400}
          />
        </div>
        <div className="md:w-2/3">
          <div className="flex flex-col w-full">
            {faqs.map((faq, index) => (
              <FAQItem
                key={faq.id}
                id={faq.id}
                question={faq.question}
                answer={faq.answer}
                isOpen={index === openIndex}
                onClick={() => setOpenIndex(index === openIndex ? -1 : index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
