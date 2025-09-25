"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getCompanies } from "./api/enterpriseSearch/enterpriseSearch";
import { useCompanyStore } from "@/stores/company-store";

export default function Home() {
  const setCompanies = useCompanyStore((state) => state.setCompanies);
  const companies = useCompanyStore((state) => state.companies);
  const selectedCompany = useCompanyStore((state) => state.selectedCompany);
  const router = useRouter();

  // Fetch companies for the logged-in user
  useEffect(() => {
    const userId =
      typeof window !== "undefined" ? localStorage.getItem("user_id") : null;
    console.log("Current userId from localStorage:", userId);

    if (userId) {
      console.log("Fetching companies for user:", userId);
      getCompanies(userId)
        .then((res) => {
          console.log("API Response:", res);
          if (res && res.code === 200 && Array.isArray(res.data)) {
            type RawCompany = {
              companyId: { toString: () => string };
              name: string;
              role: string;
            };
            const mapped = (res.data as RawCompany[]).map((c) => ({
              ...c,
              companyId: c.companyId.toString(),
            }));
            console.log("Mapped companies:", mapped);
            setCompanies(mapped);
          } else {
            console.warn("Invalid response format or empty data");
          }
        })
        .catch((error) => {
          console.error("Error fetching companies:", error);
        });
    } else {
      console.log("No userId found, redirecting to signin");
      router.push("/auth/signin");
    }
  }, [setCompanies, router]);

  // When selected company changes, fetch user & member info and post to FastAPI
  useEffect(() => {
    async function postSelectedCompany() {
      if (!selectedCompany) return;

      const userId =
        typeof window !== "undefined" ? localStorage.getItem("user_id") : null;
      if (!userId) {
        console.error("User ID missing, cannot send payload");
        return;
      }

      try {
        // Fetch member details (non-fatal)
        let member: any = null;
        try {
          const memberRes = await fetch("/api/users/get-member", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId, companyId: selectedCompany.companyId }),
          });
          if (memberRes.ok) {
            const json = await memberRes.json();
            member = json?.member ?? null;
          } else {
            console.warn("/api/users/get-member returned", memberRes.status);
          }
        } catch (e) {
          console.warn("Failed to fetch member", e);
        }

        // Fetch user details (non-fatal)
        let user: any = null;
        try {
          const userRes = await fetch("/api/users/get-user", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId }),
          });
          if (userRes.ok) {
            const json = await userRes.json();
            user = json?.user ?? null;
          } else {
            console.warn("/api/users/get-user returned", userRes.status);
          }
        } catch (e) {
          console.warn("Failed to fetch user", e);
        }

        const fastApiPayload = {
          user_id: userId,
          company_id: selectedCompany.companyId,
          email: user?.email,
          mobile: user?.mobile || "0000000000",
          name: user?.name,
          designation: user?.designation,
          role: member?.role,
          status: member?.status,
        };

        // console.log("Sending payload to FastAPI:", fastApiPayload);

        // const response = await fetch(
        //   `${process.env.NEXT_PUBLIC_FASTAPI_URL}/api/v1/users/register`,
        //   {
        //     method: "POST",
        //     headers: {
        //       "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify(fastApiPayload),
        //   }
        // );

        // if (!response.ok) throw new Error("Failed to send payload");
        // const data = await response.json();
        // console.log("FastAPI Response:", data);

        router.push("/home");
      } catch (error) {
        console.error("Error building/sending payload:", error);
        // Non-fatal: still proceed to home to avoid blocking startup
        router.push("/home");
      }
    }

    if (companies && companies.length > 0) {
      if (selectedCompany) {
        console.log("Selected company found, posting to FastAPI...");
        postSelectedCompany();
      } else {
        console.log("No selected company, redirecting to org-list");
        router.push("/org-list");
      }
    }
  }, [companies, selectedCompany, router]);

  return <></>;
}
