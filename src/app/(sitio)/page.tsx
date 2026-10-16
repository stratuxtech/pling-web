import { Hero } from "@/components/home/Hero";
import { Banderin } from "@/components/home/Banderin";
import { Calculadora } from "@/components/home/Calculadora";
import { Tiendas } from "@/components/home/Tiendas";
import { Funcionalidades } from "@/components/home/Funcionalidades";
import { Sistemas } from "@/components/home/Sistemas";
import { PorQue } from "@/components/home/PorQue";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Banderin />
      <Calculadora />
      <Tiendas />
      <Funcionalidades />
      <Sistemas />
      <PorQue />
    </>
  );
}
