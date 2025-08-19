"use client";

import React, { useState } from "react";
import { Shield, Upload, FileText, AlertTriangle, CheckCircle, Eye, Download, Heart, Globe, MapPin, TrendingUp, CreditCard, Lock, Award, Building, GraduationCap, Landmark, Users, Plane, Factory, Zap, Car, Pill, Database, Radio, Flag, Star, Crown, Network, Cpu, ChevronRight, ChevronLeft } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
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
  detailedAnalysis?: any;
}

const complianceStandards: ComplianceStandard[] = [
  {
    id: "hipaa",
    name: "HIPAA",
    description: "Health Insurance Portability and Accountability Act",
    icon: Heart,
    color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
  },
  {
    id: "gdpr",
    name: "GDPR",
    description: "General Data Protection Regulation",
    icon: Globe,
    color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
  },
  {
    id: "ccpa",
    name: "CCPA",
    description: "California Consumer Privacy Act",
    icon: MapPin,
    color: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
  },
  {
    id: "sox",
    name: "SOX",
    description: "Sarbanes-Oxley Act",
    icon: TrendingUp,
    color: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
  },
  {
    id: "pci-dss",
    name: "PCI DSS",
    description: "Payment Card Industry Data Security Standard",
    icon: CreditCard,
    color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
  },
  {
    id: "iso-27001",
    name: "ISO 27001",
    description: "Information Security Management Systems",
    icon: Lock,
    color: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300"
  },
  {
    id: "iso-9001",
    name: "ISO 9001",
    description: "Quality Management Systems",
    icon: Award,
    color: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300"
  },
  {
    id: "nist",
    name: "NIST",
    description: "National Institute of Standards and Technology",
    icon: Building,
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
    icon: GraduationCap,
    color: "bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-300"
  },
  {
    id: "glba",
    name: "GLBA",
    description: "Gramm-Leach-Bliley Act",
    icon: Landmark,
    color: "bg-lime-100 text-lime-800 dark:bg-lime-900 dark:text-lime-300"
  },
  {
    id: "soc2",
    name: "SOC 2",
    description: "Service Organization Control 2",
    icon: Users,
    color: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-300"
  },
  {
    id: "faa",
    name: "FAA",
    description: "Federal Aviation Administration Regulations",
    icon: Plane,
    color: "bg-sky-100 text-sky-800 dark:bg-sky-900 dark:text-sky-300"
  },
  {
    id: "osha",
    name: "OSHA",
    description: "Occupational Safety and Health Administration",
    icon: Factory,
    color: "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300"
  },
  {
    id: "nerc-cip",
    name: "NERC CIP",
    description: "North American Electric Reliability Corporation",
    icon: Zap,
    color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
  },
  {
    id: "dot",
    name: "DOT",
    description: "Department of Transportation Regulations",
    icon: Car,
    color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
  },
  {
    id: "fda",
    name: "FDA",
    description: "Food and Drug Administration Regulations",
    icon: Pill,
    color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
  },
  {
    id: "iso-14001",
    name: "ISO 14001",
    description: "Environmental Management Systems",
    icon: Globe,
    color: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-300"
  },
  {
    id: "cobit",
    name: "COBIT",
    description: "Control Objectives for Information Technologies",
    icon: Database,
    color: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
  },
  {
    id: "iso-22301",
    name: "ISO 22301",
    description: "Business Continuity Management Systems",
    icon: Shield,
    color: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
  },
  {
    id: "fcc",
    name: "FCC",
    description: "Federal Communications Commission Regulations",
    icon: Radio,
    color: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300"
  },
  {
    id: "itar",
    name: "ITAR",
    description: "International Traffic in Arms Regulations",
    icon: Shield,
    color: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
  },
  {
    id: "coso",
    name: "COSO",
    description: "Committee of Sponsoring Organizations Framework",
    icon: Building,
    color: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300"
  },
  {
    id: "iso-45001",
    name: "ISO 45001",
    description: "Occupational Health and Safety Management",
    icon: Heart,
    color: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
  },
  {
    id: "coppa",
    name: "COPPA",
    description: "Children's Online Privacy Protection Act",
    icon: Users,
    color: "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300"
  },
  {
    id: "pipeda",
    name: "PIPEDA",
    description: "Personal Information Protection and Electronic Documents Act",
    icon: MapPin,
    color: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
  },
  {
    id: "basel-iii",
    name: "Basel III",
    description: "International Banking Regulatory Framework",
    icon: Landmark,
    color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
  },
  {
    id: "mifid-ii",
    name: "MiFID II",
    description: "Markets in Financial Instruments Directive",
    icon: TrendingUp,
    color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
  },
  {
    id: "iec-62304",
    name: "IEC 62304",
    description: "Medical Device Software Life Cycle Processes",
    icon: Heart,
    color: "bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-300"
  },
  {
    id: "iso-13485",
    name: "ISO 13485",
    description: "Medical Devices Quality Management Systems",
    icon: Award,
    color: "bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-300"
  },
  {
    id: "dpdp-act",
    name: "DPDP Act",
    description: "Digital Personal Data Protection Act (India)",
    icon: Flag,
    color: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300"
  },
  {
    id: "it-act-2000",
    name: "IT Act 2000",
    description: "Information Technology Act (India)",
    icon: Cpu,
    color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
  },
  {
    id: "rbi-guidelines",
    name: "RBI Guidelines",
    description: "Reserve Bank of India Cybersecurity Framework",
    icon: Landmark,
    color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
  },
  {
    id: "pdpa-singapore",
    name: "PDPA Singapore",
    description: "Personal Data Protection Act (Singapore)",
    icon: Star,
    color: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
  },
  {
    id: "mas-trmg",
    name: "MAS TRMG",
    description: "Monetary Authority of Singapore Technology Risk Management",
    icon: Building,
    color: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
  },
  {
    id: "difc-dpl",
    name: "DIFC DPL",
    description: "Dubai International Financial Centre Data Protection Law",
    icon: Crown,
    color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
  },
  {
    id: "uae-dpl",
    name: "UAE DPL",
    description: "United Arab Emirates Data Protection Law",
    icon: MapPin,
    color: "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300"
  },
  {
    id: "nis2-directive",
    name: "NIS2 Directive",
    description: "Network and Information Systems Security Directive (EU)",
    icon: Network,
    color: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300"
  },
  {
    id: "dora-regulation",
    name: "DORA",
    description: "Digital Operational Resilience Act (EU)",
    icon: Shield,
    color: "bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-300"
  },
  {
    id: "ai-act-eu",
    name: "EU AI Act",
    description: "European Union Artificial Intelligence Act",
    icon: Cpu,
    color: "bg-violet-100 text-violet-800 dark:bg-violet-900 dark:text-violet-300"
  }
];

const initialResults: ComplianceResult[] = [];

export default function ComplianceCheckPage() {
  const [selectedStandards, setSelectedStandards] = useState<string[]>([]);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<ComplianceResult[]>(initialResults);
  const [currentStep, setCurrentStep] = useState(1);
  const [analysisMethod, setAnalysisMethod] = useState<string>("");

  const steps = [
    { id: 1, title: "Select Standards", description: "Choose compliance standards" },
    { id: 2, title: "Upload Document", description: "Upload your policy document" },
    { id: 3, title: "Review & Analyze", description: "Review selections and analyze" },
    { id: 4, title: "Results", description: "View compliance analysis" }
  ];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);
    }
  };

  const handleStandardToggle = (standardId: string) => {
    setSelectedStandards(prev => {
      if (prev.includes(standardId)) {
        return prev.filter(id => id !== standardId);
      } else {
        return [...prev, standardId];
      }
    });
  };

  const handleAnalyze = async () => {
    if (!uploadedFile || selectedStandards.length === 0) return;

    setIsAnalyzing(true);
    setResults([]);

    try {
      const formData = new FormData();
      formData.append('file', uploadedFile);
      formData.append('selectedStandards', JSON.stringify(selectedStandards));

      const response = await fetch('/api/compliance-analysis', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Analysis failed');
      }

      console.log('Analysis completed using:', data.method || 'unknown method');
      setAnalysisMethod(data.method || 'unknown');

      const analysis = data.analysis;
      const overallScore = analysis.overallScore || 75;
      const status = overallScore >= 90 ? "compliant" : overallScore >= 70 ? "partial" : "non-compliant";

      const allGaps: string[] = [];
      const allSuggestions: string[] = [];

      analysis.standardsAnalysis?.forEach((standardAnalysis: any) => {
        if (standardAnalysis.gaps && standardAnalysis.gaps.length > 0) {
          allGaps.push(...standardAnalysis.gaps);
        }
        if (standardAnalysis.suggestions && standardAnalysis.suggestions.length > 0) {
          allSuggestions.push(...standardAnalysis.suggestions);
        }
      });

      if (allGaps.length === 0 && allSuggestions.length === 0 && overallScore === 75) {
        throw new Error('Analysis did not produce meaningful results.');
      }

      const newResult: ComplianceResult = {
        id: Date.now().toString(),
        fileName: uploadedFile.name,
        standard: selectedStandards.map(s => s.toUpperCase()).join(", "),
        status: status,
        score: overallScore,
        gaps: allGaps.length > 0 ? allGaps : ["Analysis completed but no specific compliance gaps were identified."],
        suggestions: allSuggestions.length > 0 ? allSuggestions : ["No specific improvement suggestions were generated."],
        uploadDate: new Date().toISOString().split('T')[0],
        detailedAnalysis: analysis
      };

      setResults([newResult]);
      setCurrentStep(4);
    } catch (error) {
      console.error('Analysis error:', error);
      const errorResult: ComplianceResult = {
        id: Date.now().toString(),
        fileName: uploadedFile.name,
        standard: selectedStandards.map(s => s.toUpperCase()).join(", "),
        status: "non-compliant",
        score: 0,
        gaps: [`Analysis failed: ${error instanceof Error ? error.message : 'Unknown error'}`],
        suggestions: ["Please try again or contact support"],
        uploadDate: new Date().toISOString().split('T')[0]
      };
      setResults([errorResult]);
      setCurrentStep(4);
    } finally {
      setIsAnalyzing(false);
    }
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

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const canProceedToStep2 = selectedStandards.length > 0;
  const canProceedToStep3 = uploadedFile !== null;
  const canAnalyze = selectedStandards.length > 0 && uploadedFile !== null;

  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-foreground flex items-center justify-center gap-2">
          <Shield className="h-8 w-8" />
          Compliance Check
        </h1>
        <p className="text-muted-foreground">
          Analyze your documents against compliance standards using AI
        </p>
      </div>

      {/* Stepper Indicator */}
      <div className="flex items-center justify-center space-x-4">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center">
            <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all ${currentStep >= step.id
              ? 'bg-primary border-primary text-primary-foreground'
              : 'border-muted-foreground text-muted-foreground'
              }`}>
              {currentStep > step.id ? (
                <CheckCircle className="h-5 w-5" />
              ) : (
                <span className="text-sm font-medium">{step.id}</span>
              )}
            </div>
            {index < steps.length - 1 && (
              <div className={`w-16 h-0.5 mx-2 transition-all ${currentStep > step.id ? 'bg-primary' : 'bg-muted-foreground/30'
                }`} />
            )}
          </div>
        ))}
      </div>

      {/* Step Title */}
      <div className="text-center">
        <h2 className="text-xl font-semibold">{steps[currentStep - 1]?.title}</h2>
        <p className="text-muted-foreground text-sm">{steps[currentStep - 1]?.description}</p>
      </div>



      {/* Step Content */}
      <Card className="min-h-[600px]">
        <CardContent className="p-10">
          {/* Step 1: Select Compliance Standards */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-muted-foreground">
                    {selectedStandards.length} of {complianceStandards.length} standards selected
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedStandards(complianceStandards.map(s => s.id))}
                  >
                    Select All
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedStandards([])}
                  >
                    Clear All
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 max-h-[450px] overflow-y-auto p-2" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                {complianceStandards.map((standard) => (
                  <Card
                    key={standard.id}
                    className={`cursor-pointer transition-all hover:shadow-md ${selectedStandards.includes(standard.id) ? "ring-2 ring-primary bg-primary/5" : ""
                      }`}
                    onClick={() => handleStandardToggle(standard.id)}
                  >
                    <CardContent className="p-4 text-center relative min-h-[120px] flex flex-col justify-center">
                      {selectedStandards.includes(standard.id) && (
                        <div className="absolute top-2 right-2">
                          <CheckCircle className="h-4 w-4 text-primary" />
                        </div>
                      )}
                      <standard.icon className="h-7 w-7 mx-auto mb-3 text-primary" />
                      <h3 className="font-semibold text-sm mb-1">{standard.name}</h3>
                      <p className="text-xs text-muted-foreground line-clamp-2">
                        {standard.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Upload Document */}
          {currentStep === 2 && (
            <div className="space-y-8">
              <div className="relative group">
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-xl p-16 text-center transition-all duration-300 hover:border-primary/50 hover:bg-primary/5 group-hover:scale-[1.02]">
                  <div className="transition-transform duration-300 group-hover:scale-110">
                    <Upload className="h-20 w-20 mx-auto mb-6 text-muted-foreground transition-colors duration-300 group-hover:text-primary" />
                  </div>
                  <div className="space-y-3">
                    <p className="text-2xl font-semibold text-foreground">Drop your file here or click to browse</p>
                    <p className="text-muted-foreground text-lg">
                      Supports PDF, DOC, DOCX files up to 10MB
                    </p>
                    <div className="flex justify-center items-center gap-2 text-sm text-muted-foreground">
                      <FileText className="h-4 w-4" />
                      <span>PDF</span>
                      <span>•</span>
                      <span>DOC</span>
                      <span>•</span>
                      <span>DOCX</span>
                    </div>
                  </div>
                  <div className="mt-8">
                    <Button
                      variant="outline"
                      size="lg"
                      className="relative overflow-hidden transition-all duration-300 hover:scale-105"
                      onClick={() => document.getElementById('file-upload')?.click()}
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      Choose File
                    </Button>
                  </div>
                  <Input
                    id="file-upload"
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileUpload}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                </div>
              </div>

              {uploadedFile && (
                <div className="animate-in slide-in-from-bottom-4 duration-500">
                  <Card className="border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4">
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                            <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
                          </div>
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-green-900 dark:text-green-100">File Selected Successfully</h3>
                          <p className="text-green-700 dark:text-green-300 mt-1">
                            <span className="font-medium">{uploadedFile.name}</span>
                            <span className="text-sm ml-2">({(uploadedFile.size / 1024 / 1024).toFixed(2)} MB)</span>
                          </p>
                        </div>
                        <div className="flex-shrink-0">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setUploadedFile(null)}
                            className="text-green-600 hover:text-green-700 hover:bg-green-100"
                          >
                            <FileText className="h-4 w-4 mr-2" />
                            Change File
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          )}

          {/* Step 3: Review & Analyze */}
          {currentStep === 3 && (
            <div className="space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Selected Standards</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {selectedStandards.map(standardId => {
                        const standard = complianceStandards.find(s => s.id === standardId);
                        return standard ? (
                          <div key={standardId} className="flex items-center gap-2">
                            <standard.icon className="h-4 w-4 text-primary" />
                            <span className="text-sm font-medium">{standard.name}</span>
                          </div>
                        ) : null;
                      })}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Document</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {uploadedFile ? (
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-primary" />
                        <div>
                          <p className="text-sm font-medium">{uploadedFile.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground">No file selected</p>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Analysis Progress */}
              {isAnalyzing && (
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="inline-flex items-center gap-3 px-6 py-3 bg-primary/10 rounded-full">
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-primary border-t-transparent" />
                      <span className="text-primary font-medium">Analyzing Document...</span>
                    </div>
                  </div>
                  <div className="max-w-md mx-auto">
                    <div className="flex justify-between text-sm text-muted-foreground mb-2">
                      <span>Analysis Progress</span>
                      <span>Processing...</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full animate-pulse" style={{ width: '75%' }}></div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2 text-center">
                      AI is reviewing your document against selected compliance standards
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Step 4: Results */}
          {currentStep === 4 && (
            <div className="space-y-6">
              {results.length === 0 ? (
                <div className="text-center py-12">
                  <Shield className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-muted-foreground">No analysis results</h3>
                  <p className="text-sm text-muted-foreground">
                    Complete the analysis to see compliance results
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  {results.map((result) => (
                    <div key={result.id} className="space-y-4">
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <h3 className="text-xl font-semibold flex items-center gap-2">
                            <FileText className="h-5 w-5" />
                            {result.fileName}
                          </h3>
                          <p className="text-muted-foreground">
                            Analyzed against {result.standard} on {new Date(result.uploadDate).toLocaleDateString()}
                            {analysisMethod && (
                              <span className="text-xs ml-2">
                                • Powered by {analysisMethod.includes('kroolo') ? 'Kroolo AI' : 'Gemini AI'}
                              </span>
                            )}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className={getStatusColor(result.status)}>
                            {getStatusIcon(result.status)}
                            <span className="ml-1">{result.status.replace("-", " ")}</span>
                          </Badge>
                          <Badge variant="outline">{result.score}% Compliant</Badge>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span>Compliance Score</span>
                          <span>{result.score}%</span>
                        </div>
                        <Progress value={result.score} className="h-3" />
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        {result.gaps.length > 0 && (
                          <Card>
                            <CardHeader>
                              <CardTitle className="text-lg flex items-center gap-2">
                                <AlertTriangle className="h-5 w-5 text-yellow-600" />
                                Identified Gaps
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <ul className="space-y-2">
                                {result.gaps.map((gap, index) => (
                                  <li key={index} className="text-sm flex items-start gap-2">
                                    <span className="text-yellow-600 mt-1">•</span>
                                    {gap}
                                  </li>
                                ))}
                              </ul>
                            </CardContent>
                          </Card>
                        )}

                        {result.suggestions.length > 0 && (
                          <Card>
                            <CardHeader>
                              <CardTitle className="text-lg flex items-center gap-2">
                                <CheckCircle className="h-5 w-5 text-green-600" />
                                Suggestions for Improvement
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <ul className="space-y-2">
                                {result.suggestions.map((suggestion, index) => (
                                  <li key={index} className="text-sm flex items-start gap-2">
                                    <span className="text-green-600 mt-1">•</span>
                                    {suggestion}
                                  </li>
                                ))}
                              </ul>
                            </CardContent>
                          </Card>
                        )}
                      </div>

                      <div className="flex gap-2 pt-4">
                        <Button variant="outline">
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </Button>
                        <Button variant="outline">
                          <Download className="h-4 w-4 mr-2" />
                          Export Report
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => {
                            setCurrentStep(1);
                            setResults([]);
                            setSelectedStandards([]);
                            setUploadedFile(null);
                          }}
                        >
                          Start New Analysis
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Navigation Buttons */}
      {currentStep < 4 && !isAnalyzing && (
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 1}
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>

          {currentStep === 3 ? (
            <Button
              onClick={handleAnalyze}
              disabled={!canAnalyze}
              size="lg"
              className="px-8"
            >
              <Shield className="h-4 w-4 mr-2" />
              Analyze Now
            </Button>
          ) : (
            <Button
              onClick={nextStep}
              disabled={
                (currentStep === 1 && !canProceedToStep2) ||
                (currentStep === 2 && !canProceedToStep3)
              }
            >
              Next
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          )}
        </div>
      )}
    </div>
  );
}