"use client";

import React, { useState } from "react";
import { Shield, Upload, FileText, AlertTriangle, CheckCircle, Eye, Download } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface ComplianceStandard {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  color: string;
}

interface ComplianceResult {
  id: string;
  fileName: string;
  standard: string;
  status: "compliant" | "non-compliant" | "partial";
  score: number;
  gaps: string[];
  suggestions: string[];
  uploadDate: string;
}

const complianceStandards: ComplianceStandard[] = [
  {
    id: "hipaa",
    name: "HIPAA",
    description: "Health Insurance Portability and Accountability Act",
    icon: Shield,
    color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
  },
  {
    id: "gdpr",
    name: "GDPR",
    description: "General Data Protection Regulation",
    icon: Shield,
    color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
  },
  {
    id: "ccpa",
    name: "CCPA",
    description: "California Consumer Privacy Act",
    icon: Shield,
    color: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
  },
  {
    id: "sox",
    name: "SOX",
    description: "Sarbanes-Oxley Act",
    icon: Shield,
    color: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
  },
  {
    id: "pci-dss",
    name: "PCI DSS",
    description: "Payment Card Industry Data Security Standard",
    icon: Shield,
    color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
  },
  {
    id: "iso-27001",
    name: "ISO 27001",
    description: "Information Security Management Systems",
    icon: Shield,
    color: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300"
  },
  {
    id: "iso-9001",
    name: "ISO 9001",
    description: "Quality Management Systems",
    icon: Shield,
    color: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300"
  },
  {
    id: "nist",
    name: "NIST",
    description: "National Institute of Standards and Technology",
    icon: Shield,
    color: "bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-300"
  },
  {
    id: "fisma",
    name: "FISMA",
    description: "Federal Information Security Management Act",
    icon: Shield,
    color: "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300"
  },
  {
    id: "ferpa",
    name: "FERPA",
    description: "Family Educational Rights and Privacy Act",
    icon: Shield,
    color: "bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-300"
  },
  {
    id: "glba",
    name: "GLBA",
    description: "Gramm-Leach-Bliley Act",
    icon: Shield,
    color: "bg-lime-100 text-lime-800 dark:bg-lime-900 dark:text-lime-300"
  },
  {
    id: "soc2",
    name: "SOC 2",
    description: "Service Organization Control 2",
    icon: Shield,
    color: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-300"
  }
];

// Dynamic results will be stored in state and fetched from API
const initialResults: ComplianceResult[] = [];

export default function ComplianceCheckPage() {
  const [selectedStandard, setSelectedStandard] = useState<string>("gdpr");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<ComplianceResult[]>(initialResults);
  const [activeTab, setActiveTab] = useState("upload");

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
      const newResult: ComplianceResult = {
        id: Date.now().toString(),
        fileName: uploadedFile.name,
        standard: selectedStandard.toUpperCase(),
        status: "partial",
        score: Math.floor(Math.random() * 40) + 60,
        gaps: [
          "Sample gap identified in document structure",
          "Missing required compliance clause",
          "Insufficient data protection measures"
        ],
        suggestions: [
          "Add comprehensive data protection clause",
          "Include specific compliance requirements",
          "Update privacy notice section"
        ],
        uploadDate: new Date().toISOString().split('T')[0]
      };
      setResults([newResult, ...results]);
      setIsAnalyzing(false);
      setActiveTab("results");
    }, 3000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "compliant": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "partial": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      case "non-compliant": return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "compliant": return <CheckCircle className="h-4 w-4" />;
      case "partial": return <AlertTriangle className="h-4 w-4" />;
      case "non-compliant": return <AlertTriangle className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  return (
    <div className="w-full max-w-none p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <Shield className="h-6 w-6" />
            Compliance Check
          </h1>
          <p className="text-muted-foreground mt-1">
            Upload documents and check compliance against standards like HIPAA, GDPR, NISP, and ISO
          </p>
        </div>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="upload">Upload & Analyze</TabsTrigger>
          <TabsTrigger value="results">Analysis Results</TabsTrigger>
        </TabsList>

        <TabsContent value="upload" className="space-y-6">
          {/* Compliance Standards Selection */}
          <Card>
            <CardHeader>
              <CardTitle>Select Compliance Standard</CardTitle>
              <CardDescription>
                Choose the compliance standard to check your document against
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 max-h-96 overflow-y-auto">
                {complianceStandards.map((standard) => (
                  <Card
                    key={standard.id}
                    className={`cursor-pointer transition-all hover:shadow-md ${
                      selectedStandard === standard.id ? "ring-2 ring-primary" : ""
                    }`}
                    onClick={() => setSelectedStandard(standard.id)}
                  >
                    <CardContent className="p-4 text-center">
                      <standard.icon className="h-8 w-8 mx-auto mb-2 text-primary" />
                      <h3 className="font-semibold">{standard.name}</h3>
                      <p className="text-xs text-muted-foreground mt-1">
                        {standard.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* File Upload */}
          <Card>
            <CardHeader>
              <CardTitle>Upload Document</CardTitle>
              <CardDescription>
                Upload your document for compliance analysis
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <div className="space-y-2">
                  <p className="text-lg font-medium">Drop your file here or click to browse</p>
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
                  <AlertTitle>File Selected</AlertTitle>
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
                    Analyzing Document...
                  </>
                ) : (
                  <>
                    <Shield className="h-4 w-4 mr-2" />
                    Analyze Compliance
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="results" className="space-y-4">
          {results.length === 0 ? (
            <Card>
              <CardContent className="flex items-center justify-center py-12">
                <div className="text-center">
                  <Shield className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-muted-foreground">No analysis results</h3>
                  <p className="text-sm text-muted-foreground">
                    Upload and analyze a document to see compliance results
                  </p>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {results.map((result) => (
                <Card key={result.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <CardTitle className="flex items-center gap-2">
                          <FileText className="h-5 w-5" />
                          {result.fileName}
                        </CardTitle>
                        <CardDescription>
                          Analyzed against {result.standard} on {new Date(result.uploadDate).toLocaleDateString()}
                        </CardDescription>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={getStatusColor(result.status)}>
                          {getStatusIcon(result.status)}
                          <span className="ml-1">{result.status.replace("-", " ")}</span>
                        </Badge>
                        <Badge variant="outline">{result.score}% Compliant</Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Compliance Score</span>
                        <span>{result.score}%</span>
                      </div>
                      <Progress value={result.score} className="h-2" />
                    </div>

                    {result.gaps.length > 0 && (
                      <div>
                        <h4 className="font-semibold text-sm mb-2 flex items-center gap-1">
                          <AlertTriangle className="h-4 w-4 text-yellow-600" />
                          Identified Gaps
                        </h4>
                        <ul className="space-y-1">
                          {result.gaps.map((gap, index) => (
                            <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                              <span className="text-yellow-600 mt-1">•</span>
                              {gap}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {result.suggestions.length > 0 && (
                      <div>
                        <h4 className="font-semibold text-sm mb-2 flex items-center gap-1">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          Suggestions for Improvement
                        </h4>
                        <ul className="space-y-1">
                          {result.suggestions.map((suggestion, index) => (
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
                        View Details
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
