import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { expect, test, describe, vi, beforeEach } from "vitest";
import { ContactForm } from "./ContactForm";
import { dictionaries } from "../dictionaries";

const dict = dictionaries["en-US"];

// Mock sonner
vi.mock("sonner", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

vi.mock("react-google-recaptcha-v3", () => ({
  useGoogleReCaptcha: () => ({
    executeRecaptcha: vi.fn().mockResolvedValue("mock-token"),
  }),
  GoogleReCaptchaProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

import { toast } from "sonner";

// Mock fetch
global.fetch = vi.fn();

describe("ContactForm Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("successful submit shows success toast and resets form", async () => {
    // Mock fetch with a small delay to ensure we can capture the loading state
    vi.mocked(fetch).mockImplementationOnce(() => 
      new Promise(resolve => setTimeout(() => 
        resolve({
          ok: true,
          json: async () => ({ ok: true }),
        } as Response), 100)
      )
    );

    render(<ContactForm dict={dict} />);

    // Fill form
    fireEvent.change(screen.getByLabelText(dict.contact.form.name, { exact: false }), { target: { value: "John Doe" } });
    fireEvent.change(screen.getByLabelText(dict.contact.form.email, { exact: false }), { target: { value: "john@example.com" } });
    fireEvent.change(screen.getByLabelText(dict.contact.form.message, { exact: false }), { target: { value: "This is a test message satisfying min length." } });

    const submitBtn = screen.getByRole("button", { name: dict.contact.form.submit });
    
    // Use fireEvent.click which should trigger the submit
    fireEvent.click(submitBtn);

    // Wait for async loading state (check for spinner)
    await waitFor(() => {
      expect(submitBtn).toBeDisabled();
      expect(submitBtn.querySelector(".animate-spin")).toBeInTheDocument();
    }, { timeout: 2000 });

    // Wait for the final success call
    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith(dict.contact.form.success);
      expect(screen.getByText(dict.contact.form.successDescription)).toBeInTheDocument();
    }, { timeout: 3000 });

    // Form should be reset and in cooldown
    await waitFor(() => {
      expect(screen.getByLabelText(dict.contact.form.name, { exact: false })).toHaveValue("");
      expect(screen.getByText(new RegExp(dict.contact.form.cooldown, "i"))).toBeInTheDocument();
    });
  });

  test("error response shows error toast", async () => {
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: false,
      json: async () => ({ ok: false, error: "Server Error" }),
    } as Response);

    render(<ContactForm dict={dict} />);

    fireEvent.change(screen.getByLabelText(dict.contact.form.name, { exact: false }), { target: { value: "John Doe" } });
    fireEvent.change(screen.getByLabelText(dict.contact.form.email, { exact: false }), { target: { value: "john@example.com" } });
    fireEvent.change(screen.getByLabelText(dict.contact.form.message, { exact: false }), { target: { value: "This is a test message." } });

    fireEvent.click(screen.getByRole("button", { name: dict.contact.form.submit }));

    await waitFor(() => {
      const formData = {
        name: "John Doe",
        email: "john@example.com",
        phone: "",
        message: "This is a test message.",
        company: "", // Honeypot field, should be empty
      };
      // Verify fetch call
      expect(fetch).toHaveBeenCalledWith("/api/contact", expect.objectContaining({
        method: "POST",
        headers: { "Content-Type": "application/json" },
      }));

      const lastCallBody = JSON.parse(vi.mocked(fetch).mock.calls[0][1]!.body as string);
      expect(lastCallBody).toEqual(expect.objectContaining({
        ...formData,
        recaptchaToken: "mock-token",
      }));
      expect(toast.error).toHaveBeenCalledWith(dict.contact.form.error);
      expect(screen.getByText(/Server Error/i)).toBeInTheDocument();
    });
  });

  test("honeypot present in DOM", () => {
    const { container } = render(<ContactForm dict={dict} />);
    const honeypot = container.querySelector('input[name="company"]');
    expect(honeypot).toBeInTheDocument();
    expect(honeypot).toHaveStyle({ display: "none" });
  });
});
