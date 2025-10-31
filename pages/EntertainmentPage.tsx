import React, { useState, useCallback } from 'react';
import { RefreshIcon } from '../components/icons.tsx';
import { QUOTES, Quote } from '../quotes.ts';


const getRandomQuote = (currentQuote: Quote | null = null): Quote => {
    let newQuote;
    if (QUOTES.length === 1) {
        return QUOTES[0];
    }
    do {
        const randomIndex = Math.floor(Math.random() * QUOTES.length);
        newQuote = QUOTES[randomIndex];
    } while (QUOTES.length > 1 && newQuote.text === currentQuote?.text);
    return newQuote;
};

const EntertainmentPage: React.FC = () => {
  const [currentQuote, setCurrentQuote] = useState<Quote>(() => getRandomQuote());

  const getNewQuote = useCallback(() => {
    setCurrentQuote(prevQuote => getRandomQuote(prevQuote));
  }, []);

  return (
    <div className="p-4 max-w-4xl mx-auto text-center">
      <h2 className="text-3xl font-bold text-brand-burgundy mb-4">Quote of the Day</h2>
      
      <div className="bg-brand-navy-light rounded-xl shadow-lg p-6 my-4 min-h-[12rem] flex items-center justify-center">
        <figure>
          <blockquote className="text-xl italic font-medium text-white relative">
            <span className="absolute -left-4 -top-2 text-6xl text-white/10 font-serif">“</span>
            {currentQuote.text}
          </blockquote>
          <figcaption className="mt-4 text-right text-slate-200">
            — {currentQuote.author ?? 'Unknown'}
          </figcaption>
        </figure>
      </div>

      <button
        onClick={getNewQuote}
        className="group flex items-center justify-center mx-auto px-5 py-2.5 bg-brand-burgundy text-white font-semibold rounded-lg shadow-md hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75 transition-all"
        aria-label="Get a new quote"
      >
        <RefreshIcon className="h-5 w-5 mr-2 group-hover:animate-spin-once" />
        New Quote
      </button>
    </div>
  );
};

export default EntertainmentPage;
