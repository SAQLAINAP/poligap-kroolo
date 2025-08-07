"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import FlaggedIssuesTable from "./flagged-issues";
import { Button } from "@/components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCompanyStore } from "@/stores/company-store";
import { Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function DashboardPage() {
  const companyId = useCompanyStore((s) => s.selectedCompany?.companyId);
  const queryClient = useQueryClient();

  // Optimistic update for marking all as read
  const markAllAsRead = useMutation({
    mutationFn: async () => {
      await fetch("/api/flagged-issues", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ companyId }),
      });
    },
    onMutate: async () => {
      await queryClient.cancelQueries({
        queryKey: ["flagged-issues", companyId],
      });
      const previous = queryClient.getQueryData(["flagged-issues", companyId]);
      queryClient.setQueryData(["flagged-issues", companyId], (old: any) =>
        (old || []).map((issue: any) =>
          issue.status === "new" ? { ...issue, status: "viewed" } : issue
        )
      );
      return { previous };
    },
    onError: (_err, _vars, context) => {
      if (context?.previous) {
        queryClient.setQueryData(
          ["flagged-issues", companyId],
          context.previous
        );
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["flagged-issues", companyId],
      });
    },
  });

  return (
    <div className="p-8">
      <h1 className="base-heading">Dashboard</h1>
      <Card className="py-2">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <CardTitle>Flagged Issues</CardTitle>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-6 w-6 p-0">
                      <Info className="h-4 w-4 text-muted-foreground" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>
                      The Flagged Issues feature helps you track and manage{" "}
                      <br />
                      content that has been reported by users for review.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <Button
              size="sm"
              variant="outline"
              onClick={() => markAllAsRead.mutate()}
              disabled={markAllAsRead.isPending}
            >
              Mark all as read
            </Button>
          </div>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <FlaggedIssuesTable />
        </CardContent>
      </Card>
    </div>
  );
}
