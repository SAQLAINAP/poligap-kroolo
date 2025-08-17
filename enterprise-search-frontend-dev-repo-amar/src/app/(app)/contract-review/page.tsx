"use client";

import React, { useState } from "react";
import { FileText, Upload, Eye, Download, AlertTriangle, CheckCircle, Clock, User } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface ContractReview {
  id: string;
  fileName: string;
  contractType: string;
  status: "pending" | "in-review" | "completed" | "requires-attention";
  riskLevel: "low" | "medium" | "high";
  score: number;
  gaps: string[];
  suggestions: string[];
  reviewer: string;
  uploadDate: string;
  reviewDate?: string;
}

// Dynamic reviews will be loaded from API or user uploads
const initialReviews: ContractReview[] = [];

export default function ContractReviewPage() {
  const [reviews, setReviews] = useState<ContractReview[]>(initialReviews);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [contractType, setContractType] = useState<string>("vendor");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [activeTab, setActiveTab] = useState("upload");

  const contractTypes = [
    { id: "vendor", name: "Vendor Agreement" },
    { id: "employment", name: "Employment Contract" },
    { id: "service", name: "Service Agreement" },
    { id: "nda", name: "Non-Disclosure Agreement" },
    { id: "license", name: "License Agreement" },
    { id: "partnership", name: "Partnership Agreement" },
    { id: "consulting", name: "Consulting Agreement" },
    { id: "lease", name: "Lease Agreement" },
    { id: "purchase", name: "Purchase Agreement" },
    { id: "distribution", name: "Distribution Agreement" },
    { id: "franchise", name: "Franchise Agreement" },
    { id: "joint-venture", name: "Joint Venture Agreement" }
  ];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);
    }
  };

  const handleAnalyze = async () => {
    if (!uploadedFile) return;
    
    setIsAnalyzing(true);
    // Simulate analysis
    setTimeout(() => {
      const newReview: ContractReview = {
        id: Date.now().toString(),
        fileName: uploadedFile.name,
        contractType: contractTypes.find(t => t.id === contractType)?.name || "Unknown",
        status: "completed",
        riskLevel: ["low", "medium", "high"][Math.floor(Math.random() * 3)] as "low" | "medium" | "high",
        score: Math.floor(Math.random() * 40) + 60,
        gaps: [
          "Sample contractual gap identified",
          "Missing standard clause for this contract type",
          "Terms and conditions need clarification"
        ],
        suggestions: [
          "Add comprehensive liability limitation clause",
          "Include standard termination procedures",
          "Update governing law and jurisdiction clauses"
        ],
        reviewer: "AI Legal Agent",
        uploadDate: new Date().toISOString().split('T')[0]
      };
      setReviews([newReview, ...reviews]);
      setIsAnalyzing(false);
      setActiveTab("reviews");
    }, 3000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "in-review": return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case "pending": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      case "requires-attention": return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "low": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "medium": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      case "high": return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed": return <CheckCircle className="h-4 w-4" />;
      case "in-review": return <Clock className="h-4 w-4" />;
      case "pending": return <Clock className="h-4 w-4" />;
      case "requires-attention": return <AlertTriangle className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  return (
    <div className="w-full max-w-none p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <FileText className="h-6 w-6" />
            Contract Review
          </h1>
          <p className="text-muted-foreground mt-1">
            Upload contracts and get AI-powered analysis against reference templates
          </p>
        </div>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="upload">Upload & Analyze</TabsTrigger>
          <TabsTrigger value="reviews">Contract Reviews</TabsTrigger>
        </TabsList>

        <TabsContent value="upload" className="space-y-6">
          {/* Contract Type Selection */}
          <Card>
            <CardHeader>
              <CardTitle>Select Contract Type</CardTitle>
              <CardDescription>
                Choose the type of contract for accurate analysis against reference templates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 max-h-80 overflow-y-auto">
                {contractTypes.map((type) => (
                  <Card
                    key={type.id}
                    className={`cursor-pointer transition-all hover:shadow-md ${
                      contractType === type.id ? "ring-2 ring-primary" : ""
                    }`}
                    onClick={() => setContractType(type.id)}
                  >
                    <CardContent className="p-4 text-center">
                      <FileText className="h-8 w-8 mx-auto mb-2 text-primary" />
                      <h3 className="font-semibold">{type.name}</h3>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* File Upload */}
          <Card>
            <CardHeader>
              <CardTitle>Upload Contract</CardTitle>
              <CardDescription>
                Upload your contract document for AI-powered analysis
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <div className="space-y-2">
                  <p className="text-lg font-medium">Drop your contract here or click to browse</p>
                  <p className="text-sm text-muted-foreground">
                    Supports PDF, DOC, DOCX files up to 10MB
                  </p>
                </div>
                <Input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileUpload}
                  className="mt-4 max-w-xs mx-auto"
                />
              </div>
              
              {uploadedFile && (
                <Alert>
                  <FileText className="h-4 w-4" />
                  <AlertTitle>Contract Selected</AlertTitle>
                  <AlertDescription>
                    {uploadedFile.name} ({(uploadedFile.size / 1024 / 1024).toFixed(2)} MB)
                  </AlertDescription>
                </Alert>
              )}

              <Button 
                onClick={handleAnalyze}
                disabled={!uploadedFile || isAnalyzing}
                className="w-full"
              >
                {isAnalyzing ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                    Analyzing Contract...
                  </>
                ) : (
                  <>
                    <FileText className="h-4 w-4 mr-2" />
                    Analyze Contract
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reviews" className="space-y-4">
          {reviews.length === 0 ? (
            <Card>
              <CardContent className="flex items-center justify-center py-12">
                <div className="text-center">
                  <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-muted-foreground">No contract reviews</h3>
                  <p className="text-sm text-muted-foreground">
                    Upload and analyze a contract to see review results
                  </p>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {reviews.map((review) => (
                <Card key={review.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <CardTitle className="flex items-center gap-2">
                          <FileText className="h-5 w-5" />
                          {review.fileName}
                        </CardTitle>
                        <CardDescription>
                          {review.contractType} • Uploaded on {new Date(review.uploadDate).toLocaleDateString()}
                          {review.reviewDate && ` • Reviewed on ${new Date(review.reviewDate).toLocaleDateString()}`}
                        </CardDescription>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={getStatusColor(review.status)}>
                          {getStatusIcon(review.status)}
                          <span className="ml-1">{review.status.replace("-", " ")}</span>
                        </Badge>
                        <Badge className={getRiskColor(review.riskLevel)}>
                          Risk: {review.riskLevel}
                        </Badge>
                        <Badge variant="outline">{review.score}% Score</Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Contract Quality Score</span>
                        <span>{review.score}%</span>
                      </div>
                      <Progress value={review.score} className="h-2" />
                    </div>

                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        <span>Reviewed by: {review.reviewer}</span>
                      </div>
                    </div>

                    {review.gaps.length > 0 && (
                      <div>
                        <h4 className="font-semibold text-sm mb-2 flex items-center gap-1">
                          <AlertTriangle className="h-4 w-4 text-yellow-600" />
                          Identified Gaps
                        </h4>
                        <ul className="space-y-1">
                          {review.gaps.map((gap, index) => (
                            <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                              <span className="text-yellow-600 mt-1">•</span>
                              {gap}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {review.suggestions.length > 0 && (
                      <div>
                        <h4 className="font-semibold text-sm mb-2 flex items-center gap-1">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          Suggestions for Improvement
                        </h4>
                        <ul className="space-y-1">
                          {review.suggestions.map((suggestion, index) => (
                            <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                              <span className="text-green-600 mt-1">•</span>
                              {suggestion}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div className="flex gap-2 pt-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-2" />
                        View Full Analysis
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Export Report
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
