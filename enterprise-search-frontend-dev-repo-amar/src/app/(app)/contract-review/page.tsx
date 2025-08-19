"use client";

import React, { useState } from "react";
import { FileText, Upload, Eye, Download, AlertTriangle, CheckCircle, Clock, User, ChevronRight, ChevronLeft, Building, Users, Shield, Handshake, Award, Home, TrendingUp, Car, ShoppingCart, Truck, Crown, Network, Search, Filter, Briefcase, Globe, Heart, Zap, Wifi, Database, Code, Palette, Music, Camera, Plane, Ship, Factory, Hammer, Wrench, Cog, Book, GraduationCap, Stethoscope, Scale, Gavel, DollarSign, CreditCard, PiggyBank, Landmark, Info } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
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
  const [selectedContractTypes, setSelectedContractTypes] = useState<string[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");

  const contractTypes = [
    // Business Contracts
    { id: "vendor", name: "Vendor Agreement", icon: Building, color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300" },
    { id: "partnership", name: "Partnership Agreement", icon: Network, color: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300" },
    { id: "consulting", name: "Consulting Agreement", icon: TrendingUp, color: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300" },
    { id: "franchise", name: "Franchise Agreement", icon: Crown, color: "bg-lime-100 text-lime-800 dark:bg-lime-900 dark:text-lime-300" },
    { id: "joint-venture", name: "Joint Venture Agreement", icon: Handshake, color: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-300" },
    { id: "merger", name: "Merger Agreement", icon: Briefcase, color: "bg-violet-100 text-violet-800 dark:bg-violet-900 dark:text-violet-300" },
    { id: "acquisition", name: "Acquisition Agreement", icon: Building, color: "bg-slate-100 text-slate-800 dark:bg-slate-900 dark:text-slate-300" },
    { id: "outsourcing", name: "Outsourcing Agreement", icon: Globe, color: "bg-sky-100 text-sky-800 dark:bg-sky-900 dark:text-sky-300" },
    { id: "supply-chain", name: "Supply Chain Agreement", icon: Truck, color: "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300" },
    { id: "manufacturing", name: "Manufacturing Agreement", icon: Factory, color: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300" },

    // Legal Contracts
    { id: "employment", name: "Employment Contract", icon: Users, color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300" },
    { id: "nda", name: "Non-Disclosure Agreement", icon: Shield, color: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300" },
    { id: "license", name: "License Agreement", icon: Award, color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300" },
    { id: "confidentiality", name: "Confidentiality Agreement", icon: Shield, color: "bg-rose-100 text-rose-800 dark:bg-rose-900 dark:text-rose-300" },
    { id: "non-compete", name: "Non-Compete Agreement", icon: Scale, color: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300" },
    { id: "settlement", name: "Settlement Agreement", icon: Gavel, color: "bg-stone-100 text-stone-800 dark:bg-stone-900 dark:text-stone-300" },
    { id: "arbitration", name: "Arbitration Agreement", icon: Scale, color: "bg-neutral-100 text-neutral-800 dark:bg-neutral-900 dark:text-neutral-300" },
    { id: "power-attorney", name: "Power of Attorney", icon: Gavel, color: "bg-zinc-100 text-zinc-800 dark:bg-zinc-900 dark:text-zinc-300" },

    // Property & Real Estate
    { id: "lease", name: "Lease Agreement", icon: Home, color: "bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-300" },
    { id: "rental", name: "Rental Agreement", icon: Home, color: "bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-300" },
    { id: "property-sale", name: "Property Sale Agreement", icon: Home, color: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-300" },
    { id: "mortgage", name: "Mortgage Agreement", icon: Landmark, color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300" },
    { id: "construction", name: "Construction Contract", icon: Hammer, color: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300" },
    { id: "maintenance", name: "Maintenance Agreement", icon: Wrench, color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300" },

    // Commercial & Sales
    { id: "service", name: "Service Agreement", icon: Handshake, color: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300" },
    { id: "purchase", name: "Purchase Agreement", icon: ShoppingCart, color: "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300" },
    { id: "distribution", name: "Distribution Agreement", icon: Truck, color: "bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-300" },
    { id: "sales", name: "Sales Agreement", icon: DollarSign, color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300" },
    { id: "subscription", name: "Subscription Agreement", icon: CreditCard, color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300" },
    { id: "warranty", name: "Warranty Agreement", icon: Shield, color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300" },

    // Technology & IP
    { id: "software", name: "Software License Agreement", icon: Code, color: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300" },
    { id: "saas", name: "SaaS Agreement", icon: Wifi, color: "bg-sky-100 text-sky-800 dark:bg-sky-900 dark:text-sky-300" },
    { id: "data-processing", name: "Data Processing Agreement", icon: Database, color: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300" },
    { id: "hosting", name: "Hosting Agreement", icon: Zap, color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300" },
    { id: "development", name: "Development Agreement", icon: Code, color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300" },
    { id: "api", name: "API Agreement", icon: Cog, color: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300" },

    // Specialized Services
    { id: "healthcare", name: "Healthcare Service Agreement", icon: Heart, color: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300" },
    { id: "education", name: "Education Service Agreement", icon: GraduationCap, color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300" },
    { id: "transportation", name: "Transportation Agreement", icon: Car, color: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300" },
    { id: "logistics", name: "Logistics Agreement", icon: Plane, color: "bg-sky-100 text-sky-800 dark:bg-sky-900 dark:text-sky-300" },
    { id: "insurance", name: "Insurance Agreement", icon: Shield, color: "bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-300" },
    { id: "financial", name: "Financial Services Agreement", icon: PiggyBank, color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300" }
  ];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);
    }
  };

  const steps = [
    { id: 1, title: "Select Contract Type", description: "Choose the type of contract for analysis" },
    { id: 2, title: "Upload Contract", description: "Upload your contract document" },
    { id: 3, title: "Review & Analyze", description: "Review selections and analyze contract" },
    { id: 4, title: "Results", description: "View contract analysis results" }
  ];

  const handleAnalyze = async () => {
    if (!uploadedFile) return;
    
    setIsAnalyzing(true);
    // Simulate analysis
    setTimeout(() => {
      const newReview: ContractReview = {
        id: Date.now().toString(),
        fileName: uploadedFile.name,
        contractType: selectedContractTypes.map(id => contractTypes.find(t => t.id === id)?.name).join(", ") || "Unknown",
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
      setCurrentStep(4);
    }, 3000);
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

  const handleContractTypeToggle = (typeId: string) => {
    setSelectedContractTypes(prev => {
      if (prev.includes(typeId)) {
        return prev.filter(id => id !== typeId);
      } else {
        return [...prev, typeId];
      }
    });
  };

  const filterCategories = [
    { id: "all", name: "All Categories" },
    { id: "business", name: "Business" },
    { id: "legal", name: "Legal" },
    { id: "property", name: "Property & Real Estate" },
    { id: "commercial", name: "Commercial & Sales" },
    { id: "technology", name: "Technology & IP" },
    { id: "specialized", name: "Specialized Services" }
  ];

  const getContractCategory = (contractId: string) => {
    const businessTypes = ["vendor", "partnership", "consulting", "franchise", "joint-venture", "merger", "acquisition", "outsourcing", "supply-chain", "manufacturing"];
    const legalTypes = ["employment", "nda", "license", "confidentiality", "non-compete", "settlement", "arbitration", "power-attorney"];
    const propertyTypes = ["lease", "rental", "property-sale", "mortgage", "construction", "maintenance"];
    const commercialTypes = ["service", "purchase", "distribution", "sales", "subscription", "warranty"];
    const technologyTypes = ["software", "saas", "data-processing", "hosting", "development", "api"];
    const specializedTypes = ["healthcare", "education", "transportation", "logistics", "insurance", "financial"];

    if (businessTypes.includes(contractId)) return "business";
    if (legalTypes.includes(contractId)) return "legal";
    if (propertyTypes.includes(contractId)) return "property";
    if (commercialTypes.includes(contractId)) return "commercial";
    if (technologyTypes.includes(contractId)) return "technology";
    if (specializedTypes.includes(contractId)) return "specialized";
    return "business";
  };

  const filteredContractTypes = contractTypes.filter(type => {
    const matchesSearch = type.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === "all" || getContractCategory(type.id) === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const canProceedToStep2 = selectedContractTypes.length > 0;
  const canProceedToStep3 = uploadedFile !== null;
  const canAnalyze = selectedContractTypes.length > 0 && uploadedFile !== null;

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
    <div className="w-full max-w-6xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-foreground flex items-center justify-center gap-2">
          <FileText className="h-8 w-8" />
          Contract Review
        </h1>
        <p className="text-muted-foreground">
          Upload contracts and get AI-powered analysis against reference templates
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
        <h2 className="text-2xl font-bold">{steps[currentStep - 1]?.title}</h2>
        <p className="text-muted-foreground text-lg">{steps[currentStep - 1]?.description}</p>
      </div>

      {/* Step Content */}
      <Card className="min-h-[600px]">
        <CardContent className="p-10">

          {/* Step 1: Select Contract Type */}
          {currentStep === 1 && (
            <div className="space-y-6">
              {/* Search and Filter Controls */}
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                <div className="flex flex-col sm:flex-row gap-3 flex-1">
                  {/* Search Box */}
                  <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search contract types..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  
                  {/* Filter Dropdown */}
                  <div className="relative">
                    <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <select
                      value={selectedFilter}
                      onChange={(e) => setSelectedFilter(e.target.value)}
                      className="pl-10 pr-8 py-2 border border-input bg-background rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                    >
                      {filterCategories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Clear All Button */}
                {selectedContractTypes.length > 0 && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedContractTypes([])}
                    className="shrink-0"
                  >
                    Clear All ({selectedContractTypes.length})
                  </Button>
                )}
              </div>

              {/* Results Info */}
              <div className="flex justify-between items-center text-sm text-muted-foreground">
                <span>
                  {filteredContractTypes.length} contract type{filteredContractTypes.length !== 1 ? 's' : ''} 
                  {searchTerm || selectedFilter !== "all" ? " found" : " available"}
                </span>
                {selectedContractTypes.length > 0 && (
                  <span className="font-medium">
                    {selectedContractTypes.length} selected
                  </span>
                )}
              </div>

              {/* Contract Types Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 max-h-[400px] overflow-y-auto p-2" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                {filteredContractTypes.map((type) => (
                  <Card
                    key={type.id}
                    className={`cursor-pointer transition-all hover:shadow-md ${
                      selectedContractTypes.includes(type.id) ? "ring-2 ring-primary bg-primary/5" : ""
                    }`}
                    onClick={() => handleContractTypeToggle(type.id)}
                  >
                    <CardContent className="p-4 text-center relative min-h-[120px] flex flex-col justify-center">
                      {selectedContractTypes.includes(type.id) && (
                        <div className="absolute top-2 right-2">
                          <CheckCircle className="h-4 w-4 text-primary" />
                        </div>
                      )}
                      <div className="absolute top-2 left-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0 hover:bg-primary/10"
                          onClick={(e) => {
                            e.stopPropagation();
                            window.open(`/contract-templates/${type.id}`, '_blank');
                          }}
                        >
                          <Info className="h-3 w-3 text-muted-foreground hover:text-primary" />
                        </Button>
                      </div>
                      <type.icon className="h-8 w-8 mx-auto mb-3 text-primary" />
                      <h3 className="font-bold text-sm mb-1">{type.name}</h3>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* No Results Message */}
              {filteredContractTypes.length === 0 && (
                <div className="text-center py-8">
                  <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                  <h3 className="text-lg font-semibold text-muted-foreground mb-1">No contract types found</h3>
                  <p className="text-sm text-muted-foreground">
                    Try adjusting your search or filter criteria
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Step 2: Upload Contract */}
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
                    <CardTitle className="text-lg font-bold">Selected Contract Type</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {selectedContractTypes.length > 0 ? (
                      <div className="space-y-2">
                        {selectedContractTypes.map(typeId => {
                          const selectedType = contractTypes.find(t => t.id === typeId);
                          return selectedType ? (
                            <div key={typeId} className="flex items-center gap-3">
                              <selectedType.icon className="h-5 w-5 text-primary" />
                              <span className="text-sm font-bold">{selectedType.name}</span>
                            </div>
                          ) : null;
                        })}
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground">No contract types selected</p>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg font-bold">Document</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {uploadedFile ? (
                      <div className="flex items-center gap-3">
                        <FileText className="h-5 w-5 text-primary" />
                        <div>
                          <p className="text-sm font-bold">{uploadedFile.name}</p>
                          <p className="text-xs text-muted-foreground font-medium">
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
                      <span className="text-primary font-bold">Analyzing Contract...</span>
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
                      AI is reviewing your contract against reference templates
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Step 4: Results */}
          {currentStep === 4 && (
            <div className="space-y-6">
              {reviews.length === 0 ? (
                <div className="text-center py-12">
                  <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-muted-foreground">No analysis results</h3>
                  <p className="text-sm text-muted-foreground">
                    Complete the analysis to see contract review results
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  {reviews.map((review) => (
                    <div key={review.id} className="space-y-4">
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <h3 className="text-xl font-semibold flex items-center gap-2">
                            <FileText className="h-5 w-5" />
                            {review.fileName}
                          </h3>
                          <p className="text-muted-foreground">
                            {review.contractType} • Analyzed on {new Date(review.uploadDate).toLocaleDateString()}
                          </p>
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

                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span>Contract Quality Score</span>
                          <span>{review.score}%</span>
                        </div>
                        <Progress value={review.score} className="h-3" />
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        {review.gaps.length > 0 && (
                          <Card>
                            <CardHeader>
                              <CardTitle className="text-lg flex items-center gap-2">
                                <AlertTriangle className="h-5 w-5 text-yellow-600" />
                                Identified Gaps
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <ul className="space-y-2">
                                {review.gaps.map((gap, index) => (
                                  <li key={index} className="text-sm flex items-start gap-2">
                                    <span className="text-yellow-600 mt-1">•</span>
                                    {gap}
                                  </li>
                                ))}
                              </ul>
                            </CardContent>
                          </Card>
                        )}

                        {review.suggestions.length > 0 && (
                          <Card>
                            <CardHeader>
                              <CardTitle className="text-lg flex items-center gap-2">
                                <CheckCircle className="h-5 w-5 text-green-600" />
                                Suggestions for Improvement
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <ul className="space-y-2">
                                {review.suggestions.map((suggestion, index) => (
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
                            setReviews([]);
                            setSelectedContractTypes([]);
                            setUploadedFile(null);
                          }}
                        >
                          <FileText className="h-4 w-4 mr-2" />
                          Analyze New Contract
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
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={prevStep}
          disabled={currentStep === 1}
          className="flex items-center gap-2"
        >
          <ChevronLeft className="h-4 w-4" />
          Previous
        </Button>

        <div className="flex gap-2">
          {currentStep === 3 && (
            <Button
              onClick={handleAnalyze}
              disabled={!canAnalyze || isAnalyzing}
              className="flex items-center gap-2"
            >
              {isAnalyzing ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                  Analyzing...
                </>
              ) : (
                <>
                  <FileText className="h-4 w-4" />
                  Analyze Contract
                </>
              )}
            </Button>
          )}

          {currentStep < 3 && (
            <Button
              onClick={nextStep}
              disabled={
                (currentStep === 1 && !canProceedToStep2) ||
                (currentStep === 2 && !canProceedToStep3)
              }
              className="flex items-center gap-2"
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
