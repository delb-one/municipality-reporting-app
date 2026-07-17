"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";

import { authService } from "../services/auth.service";
import { useAuth } from "../context/AuthContext";
import AlertMessage from "../components/ui/AlertMessage";
import { useRouter } from "next/navigation";

const loginSchema = z.object({
  email: z.string().email("Inserisci un indirizzo email valido"),
  password: z.string().min(1, "Password obbligatoria"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  async function onSubmit(data: LoginFormData) {
    setLoading(true);
    setError(null);
    
    try {
      const result = await authService.login(data);
      // Set cookie for middleware access
      document.cookie = `authToken=${result.token}; path=/; max-age=604800; SameSite=Lax`;
      login(result.user, result.token);
      router.push('/dashboard');
    } catch (err: unknown) {
      const error = err as { message?: string };
      setError(error?.message ?? "Errore durante il login");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4">
          <div className="card border-0 shadow" style={{ borderRadius: 12 }}>
            <div className="card-header border-0 py-3 px-4 text-center" style={{
              background: "linear-gradient(90deg, #003366, #005aab)",
              borderRadius: "12px 12px 0 0",
            }}>
              <h1 className="h5 fw-bold text-white mb-0">Accesso Operatori</h1>
            </div>
            <div className="card-body p-4">
              {error && (
                <AlertMessage
                  type="danger"
                  message={error}
                  onClose={() => setError(null)}
                />
              )}

              <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label fw-semibold">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    className={`form-control ${errors.email ? "is-invalid" : ""}`}
                    placeholder="operatore@comune.it"
                    {...register("email")}
                    disabled={loading}
                  />
                  {errors.email && (
                    <div className="invalid-feedback">{errors.email.message}</div>
                  )}
                </div>

                <div className="mb-4">
                  <label htmlFor="password" className="form-label fw-semibold">
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    className={`form-control ${errors.password ? "is-invalid" : ""}`}
                    placeholder="••••••••"
                    {...register("password")}
                    disabled={loading}
                  />
                  {errors.password && (
                    <div className="invalid-feedback">{errors.password.message}</div>
                  )}
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-100 fw-bold"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" />
                      Accesso...
                    </>
                  ) : (
                    "Accedi"
                  )}
                </button>
              </form>

              <div className="text-center mt-4">
                <Link href="/" className="text-decoration-none small">
                  Torna alla Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}