import { render, screen } from "@testing-library/react";
import { expect, test, describe } from "vitest";
import { Hero } from "./Hero";
import { dictionaries } from "../dictionaries";

const dict = dictionaries["en-US"];

describe("Hero Component", () => {
  test("renders correctly with given dictionary", () => {
    render(<Hero dict={dict} />);
    
    // Check main headings
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(dict.hero.title);
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(dict.hero.subtitle);
    
    // Check description text
    expect(screen.getByText(dict.hero.description)).toBeInTheDocument();
    
    // Check links
    expect(screen.getByRole("link", { name: new RegExp(dict.hero.link, "i") })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: new RegExp(dict.hero.code, "i") })).toBeInTheDocument();
    
    // Check image existence
    const image = screen.getByAltText("Renato Lins");
    expect(image).toBeInTheDocument();
    
    // Check years of experience
    expect(screen.getByText(dict.hero.years)).toBeInTheDocument();
  });
});
