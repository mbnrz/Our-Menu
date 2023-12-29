"use client";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Servises from "./components/Servises";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';


export default function Home() {
  return (
    <main className="h-screen bg-white">
      <Navbar />
      <Hero />
      <Servises />
      <Footer/>
    
    </main>
  );
}
