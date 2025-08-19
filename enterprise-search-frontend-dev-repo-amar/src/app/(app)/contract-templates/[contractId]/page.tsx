"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { FileText, ArrowLeft, Download, Printer, Share, Building, Users, Shield, Handshake, Award, Home, TrendingUp, Car, ShoppingCart, Truck, Crown, Network, Briefcase, Globe, Heart, Zap, Wifi, Database, Code, Factory, Hammer, Wrench, Cog, GraduationCap, Plane, Scale, Gavel, DollarSign, CreditCard, PiggyBank, Landmark } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface ContractTemplate {
  id: string;
  name: string;
  icon: any;
  category: string;
  description: string;
  keyElements: string[];
  standardClauses: {
    title: string;
    content: string;
  }[];
  legalRequirements: string[];
  governingAuthority: string;
  lastUpdated: string;
}

const contractTemplates: { [key: string]: ContractTemplate } = {
  // Business Contracts
  "vendor": {
    id: "vendor",
    name: "Vendor Agreement",
    icon: Building,
    category: "Business",
    description: "A comprehensive vendor agreement template that establishes the terms and conditions for procurement of goods or services from external suppliers.",
    keyElements: [
      "Scope of Work/Services",
      "Payment Terms and Conditions",
      "Delivery and Performance Standards",
      "Quality Assurance Requirements",
      "Intellectual Property Rights",
      "Confidentiality and Non-Disclosure",
      "Termination Clauses",
      "Dispute Resolution Mechanisms"
    ],
    standardClauses: [
      {
        title: "1. PARTIES",
        content: "This Vendor Agreement ('Agreement') is entered into on [DATE] between [COMPANY NAME], a [STATE] corporation ('Company'), and [VENDOR NAME], a [STATE] [ENTITY TYPE] ('Vendor')."
      },
      {
        title: "2. SCOPE OF SERVICES",
        content: "Vendor agrees to provide the following goods/services: [DETAILED DESCRIPTION]. All services shall be performed in accordance with the specifications set forth in Exhibit A, which is incorporated herein by reference."
      },
      {
        title: "3. PAYMENT TERMS",
        content: "Company shall pay Vendor the amounts set forth in the pricing schedule attached as Exhibit B. Payment terms are Net [NUMBER] days from receipt of invoice. Late payments may incur a service charge of 1.5% per month."
      },
      {
        title: "4. PERFORMANCE STANDARDS",
        content: "Vendor shall perform all services in a professional and workmanlike manner in accordance with industry standards. All deliverables must meet the quality standards specified in Exhibit C."
      },
      {
        title: "5. INTELLECTUAL PROPERTY",
        content: "All intellectual property rights in any work product created under this Agreement shall remain with or be assigned to Company. Vendor grants Company a perpetual, royalty-free license to use any pre-existing IP necessary for the intended use."
      },
      {
        title: "6. CONFIDENTIALITY",
        content: "Vendor acknowledges that it may have access to confidential information of Company. Vendor agrees to maintain the confidentiality of such information and not to disclose it to any third party without prior written consent."
      },
      {
        title: "7. TERMINATION",
        content: "Either party may terminate this Agreement with [NUMBER] days written notice. Company may terminate immediately for cause, including breach of this Agreement or failure to meet performance standards."
      },
      {
        title: "8. GOVERNING LAW",
        content: "This Agreement shall be governed by and construed in accordance with the laws of [STATE], without regard to its conflict of law principles. Any disputes shall be resolved through binding arbitration."
      }
    ],
    legalRequirements: [
      "Compliance with applicable federal, state, and local laws",
      "Adherence to industry-specific regulations",
      "Proper business licensing and registration",
      "Insurance requirements and liability coverage",
      "Tax compliance and reporting obligations",
      "Data protection and privacy law compliance"
    ],
    governingAuthority: "Federal Trade Commission (FTC), State Commerce Departments, Industry-Specific Regulatory Bodies",
    lastUpdated: "2024-01-15"
  },

  "employment": {
    id: "employment",
    name: "Employment Contract",
    icon: Users,
    category: "Legal",
    description: "A comprehensive employment agreement template compliant with federal and state labor laws, establishing the terms and conditions of employment.",
    keyElements: [
      "Job Title and Description",
      "Compensation and Benefits",
      "Work Schedule and Location",
      "Confidentiality and Non-Compete",
      "Intellectual Property Assignment",
      "Termination Procedures",
      "Dispute Resolution",
      "Compliance with Labor Laws"
    ],
    standardClauses: [
      {
        title: "1. EMPLOYMENT RELATIONSHIP",
        content: "Company hereby employs Employee in the position of [JOB TITLE], and Employee accepts such employment, subject to the terms and conditions set forth in this Agreement. Employment is at-will unless otherwise specified."
      },
      {
        title: "2. DUTIES AND RESPONSIBILITIES",
        content: "Employee shall perform the duties and responsibilities set forth in the job description attached as Exhibit A, and such other duties as may be assigned by Company from time to time that are consistent with Employee's position."
      },
      {
        title: "3. COMPENSATION",
        content: "Company shall pay Employee a base salary of $[AMOUNT] per [PERIOD], payable in accordance with Company's standard payroll practices. Employee may be eligible for bonuses and other compensation as determined by Company."
      },
      {
        title: "4. BENEFITS",
        content: "Employee shall be entitled to participate in Company's employee benefit plans, including health insurance, retirement plans, and paid time off, subject to the terms and conditions of such plans."
      },
      {
        title: "5. CONFIDENTIALITY",
        content: "Employee acknowledges that during employment, Employee will have access to confidential information. Employee agrees to maintain the confidentiality of such information during and after employment."
      },
      {
        title: "6. INTELLECTUAL PROPERTY",
        content: "All inventions, discoveries, and improvements made by Employee during employment that relate to Company's business shall be the exclusive property of Company. Employee agrees to assign all rights to such intellectual property to Company."
      },
      {
        title: "7. TERMINATION",
        content: "This Agreement may be terminated by either party with [NUMBER] days written notice, or immediately for cause. Upon termination, Employee shall return all Company property and confidential information."
      },
      {
        title: "8. GOVERNING LAW",
        content: "This Agreement shall be governed by the laws of [STATE] and applicable federal employment laws, including but not limited to the Fair Labor Standards Act, Title VII, and the Americans with Disabilities Act."
      }
    ],
    legalRequirements: [
      "Fair Labor Standards Act (FLSA) compliance",
      "Equal Employment Opportunity (EEO) laws",
      "Americans with Disabilities Act (ADA) compliance",
      "State-specific employment laws",
      "Workers' compensation requirements",
      "Occupational Safety and Health Act (OSHA) compliance"
    ],
    governingAuthority: "Department of Labor (DOL), Equal Employment Opportunity Commission (EEOC), State Labor Departments",
    lastUpdated: "2024-01-15"
  },

  "nda": {
    id: "nda",
    name: "Non-Disclosure Agreement",
    icon: Shield,
    category: "Legal",
    description: "A legally binding non-disclosure agreement template to protect confidential information and trade secrets in business relationships.",
    keyElements: [
      "Definition of Confidential Information",
      "Obligations of Receiving Party",
      "Permitted Uses and Exceptions",
      "Duration of Confidentiality",
      "Return of Information",
      "Legal Remedies and Enforcement",
      "Governing Law and Jurisdiction"
    ],
    standardClauses: [
      {
        title: "1. PARTIES",
        content: "This Non-Disclosure Agreement ('Agreement') is entered into on [DATE] between [DISCLOSING PARTY NAME] ('Disclosing Party') and [RECEIVING PARTY NAME] ('Receiving Party')."
      },
      {
        title: "2. CONFIDENTIAL INFORMATION",
        content: "For purposes of this Agreement, 'Confidential Information' means any and all non-public, proprietary, or confidential information disclosed by Disclosing Party, including but not limited to technical data, trade secrets, business plans, financial information, and customer lists."
      },
      {
        title: "3. OBLIGATIONS",
        content: "Receiving Party agrees to: (a) maintain the confidentiality of all Confidential Information; (b) not disclose Confidential Information to any third party without prior written consent; (c) use Confidential Information solely for the purpose of [PURPOSE]."
      },
      {
        title: "4. EXCEPTIONS",
        content: "The obligations herein shall not apply to information that: (a) is publicly available; (b) was known to Receiving Party prior to disclosure; (c) is independently developed without use of Confidential Information; (d) is required to be disclosed by law."
      },
      {
        title: "5. TERM",
        content: "This Agreement shall remain in effect for a period of [NUMBER] years from the date of execution, unless terminated earlier by mutual written consent of the parties."
      },
      {
        title: "6. RETURN OF INFORMATION",
        content: "Upon termination of this Agreement or upon request by Disclosing Party, Receiving Party shall promptly return or destroy all materials containing Confidential Information and certify such return or destruction in writing."
      },
      {
        title: "7. REMEDIES",
        content: "Receiving Party acknowledges that any breach of this Agreement may cause irreparable harm to Disclosing Party. Therefore, Disclosing Party shall be entitled to seek injunctive relief and other equitable remedies without prejudice to other available remedies."
      },
      {
        title: "8. GOVERNING LAW",
        content: "This Agreement shall be governed by and construed in accordance with the laws of [STATE], without regard to conflict of law principles. Any disputes shall be resolved in the courts of [JURISDICTION]."
      }
    ],
    legalRequirements: [
      "Trade Secrets Act compliance",
      "Uniform Trade Secrets Act (UTSA) adherence",
      "State-specific confidentiality laws",
      "Intellectual property law compliance",
      "Contract law requirements",
      "Enforceability standards"
    ],
    governingAuthority: "State Courts, Federal Courts (for federal trade secret claims), USPTO for IP-related matters",
    lastUpdated: "2024-01-15"
  },

  "lease": {
    id: "lease",
    name: "Lease Agreement",
    icon: Home,
    category: "Property & Real Estate",
    description: "A comprehensive lease agreement template for residential or commercial property rentals, compliant with federal and state housing laws.",
    keyElements: [
      "Property Description and Use",
      "Lease Term and Rent Amount",
      "Security Deposit Requirements",
      "Maintenance and Repair Obligations",
      "Tenant Rights and Responsibilities",
      "Landlord Access Rights",
      "Termination and Renewal Terms",
      "Compliance with Housing Laws"
    ],
    standardClauses: [
      {
        title: "1. PARTIES AND PROPERTY",
        content: "This Lease Agreement is entered into on [DATE] between [LANDLORD NAME] ('Landlord') and [TENANT NAME] ('Tenant') for the property located at [PROPERTY ADDRESS] ('Premises')."
      },
      {
        title: "2. LEASE TERM",
        content: "The lease term shall commence on [START DATE] and end on [END DATE]. This lease shall automatically renew for additional [PERIOD] terms unless either party provides [NUMBER] days written notice of non-renewal."
      },
      {
        title: "3. RENT AND PAYMENT",
        content: "Tenant shall pay monthly rent of $[AMOUNT], due on the [DAY] day of each month. Late payments shall incur a late fee of $[AMOUNT] after a [NUMBER] day grace period. Rent shall be paid to [PAYMENT ADDRESS/METHOD]."
      },
      {
        title: "4. SECURITY DEPOSIT",
        content: "Tenant shall pay a security deposit of $[AMOUNT] upon execution of this lease. The deposit shall be held in accordance with state law and returned within [NUMBER] days after lease termination, less any deductions for damages or unpaid rent."
      },
      {
        title: "5. USE OF PREMISES",
        content: "The Premises shall be used solely for [RESIDENTIAL/COMMERCIAL] purposes. Tenant shall not use the Premises for any illegal activities or in violation of any applicable laws, ordinances, or regulations."
      },
      {
        title: "6. MAINTENANCE AND REPAIRS",
        content: "Landlord shall maintain the Premises in habitable condition and make necessary repairs to structural elements, plumbing, heating, and electrical systems. Tenant shall maintain the Premises in clean condition and promptly report any needed repairs."
      },
      {
        title: "7. LANDLORD ACCESS",
        content: "Landlord may enter the Premises for inspections, repairs, or showings with [NUMBER] hours advance notice, except in emergencies. Entry shall be at reasonable times and in accordance with state law."
      },
      {
        title: "8. TERMINATION",
        content: "This lease may be terminated by either party with [NUMBER] days written notice. Landlord may terminate immediately for non-payment of rent, violation of lease terms, or other cause as permitted by law."
      }
    ],
    legalRequirements: [
      "Fair Housing Act compliance",
      "State landlord-tenant laws",
      "Local housing codes and ordinances",
      "Security deposit regulations",
      "Habitability standards",
      "Eviction procedure requirements"
    ],
    governingAuthority: "Department of Housing and Urban Development (HUD), State Housing Authorities, Local Housing Departments",
    lastUpdated: "2024-01-15"
  },

  "service": {
    id: "service",
    name: "Service Agreement",
    icon: Handshake,
    category: "Commercial & Sales",
    description: "A professional service agreement template for defining the terms and conditions of service provision between service providers and clients.",
    keyElements: [
      "Service Description and Scope",
      "Performance Standards and Deliverables",
      "Payment Terms and Fee Structure",
      "Timeline and Milestones",
      "Intellectual Property Rights",
      "Liability and Indemnification",
      "Termination and Cancellation",
      "Dispute Resolution"
    ],
    standardClauses: [
      {
        title: "1. AGREEMENT OVERVIEW",
        content: "This Service Agreement ('Agreement') is entered into on [DATE] between [SERVICE PROVIDER NAME] ('Provider') and [CLIENT NAME] ('Client') for the provision of [SERVICE DESCRIPTION]."
      },
      {
        title: "2. SCOPE OF SERVICES",
        content: "Provider agrees to provide the services described in Exhibit A attached hereto. All services shall be performed in a professional manner consistent with industry standards and best practices."
      },
      {
        title: "3. PERFORMANCE STANDARDS",
        content: "Provider shall perform all services with due care and in accordance with the performance standards set forth in Exhibit B. All deliverables must meet the acceptance criteria specified by Client."
      },
      {
        title: "4. COMPENSATION",
        content: "Client shall pay Provider the fees set forth in the fee schedule attached as Exhibit C. Payment terms are [PAYMENT TERMS]. Additional services outside the scope may be charged separately."
      },
      {
        title: "5. TIMELINE",
        content: "Services shall be completed according to the timeline set forth in Exhibit D. Time is of the essence. Provider shall notify Client immediately of any delays that may affect the delivery schedule."
      },
      {
        title: "6. INTELLECTUAL PROPERTY",
        content: "All work product created specifically for Client under this Agreement shall be owned by Client. Provider retains ownership of pre-existing intellectual property and general methodologies."
      },
      {
        title: "7. LIABILITY AND INDEMNIFICATION",
        content: "Provider's liability shall be limited to the amount of fees paid under this Agreement. Each party agrees to indemnify the other against claims arising from their own negligent acts or omissions."
      },
      {
        title: "8. TERMINATION",
        content: "Either party may terminate this Agreement with [NUMBER] days written notice. Client shall pay for all services performed up to the termination date. Certain provisions shall survive termination."
      }
    ],
    legalRequirements: [
      "Consumer protection laws",
      "Professional licensing requirements",
      "Industry-specific regulations",
      "Tax and business registration compliance",
      "Insurance and bonding requirements",
      "Contract law principles"
    ],
    governingAuthority: "Federal Trade Commission (FTC), State Professional Licensing Boards, Industry Regulatory Bodies",
    lastUpdated: "2024-01-15"
  },

  // Additional Business Contracts
  "partnership": {
    id: "partnership",
    name: "Partnership Agreement",
    icon: Network,
    category: "Business",
    description: "A comprehensive partnership agreement template establishing the terms for business partnerships and joint ventures.",
    keyElements: ["Partnership Structure", "Capital Contributions", "Profit/Loss Distribution", "Management Responsibilities", "Decision Making Process", "Withdrawal/Dissolution"],
    standardClauses: [
      {
        title: "1. PARTNERSHIP FORMATION",
        content: "The parties hereby form a [TYPE] partnership under the laws of [STATE] for the purpose of [BUSINESS PURPOSE]. The partnership shall commence on [DATE] and continue until dissolved."
      },
      {
        title: "2. CAPITAL CONTRIBUTIONS",
        content: "Each partner shall contribute capital as set forth in Schedule A. Additional capital contributions may be required with unanimous consent of all partners."
      }
    ],
    legalRequirements: ["Partnership registration", "Tax obligations", "State partnership laws", "Business licensing"],
    governingAuthority: "State Secretary of State, IRS, State Tax Authorities",
    lastUpdated: "2024-01-15"
  },

  "software": {
    id: "software",
    name: "Software License Agreement",
    icon: Code,
    category: "Technology & IP",
    description: "A software licensing agreement template compliant with intellectual property laws and industry standards.",
    keyElements: ["License Grant", "Usage Restrictions", "Intellectual Property Rights", "Support and Maintenance", "Liability Limitations", "Termination Rights"],
    standardClauses: [
      {
        title: "1. LICENSE GRANT",
        content: "Licensor grants Licensee a [EXCLUSIVE/NON-EXCLUSIVE] license to use the software subject to the terms and conditions herein."
      },
      {
        title: "2. RESTRICTIONS",
        content: "Licensee shall not reverse engineer, decompile, or create derivative works of the software without express written permission."
      }
    ],
    legalRequirements: ["Copyright law compliance", "DMCA provisions", "Export control laws", "Privacy regulations"],
    governingAuthority: "USPTO, Copyright Office, Department of Commerce",
    lastUpdated: "2024-01-15"
  },

  "healthcare": {
    id: "healthcare",
    name: "Healthcare Service Agreement",
    icon: Heart,
    category: "Specialized Services",
    description: "A healthcare service agreement template compliant with HIPAA and healthcare regulations.",
    keyElements: ["Service Scope", "HIPAA Compliance", "Patient Rights", "Quality Standards", "Billing Procedures", "Regulatory Compliance"],
    standardClauses: [
      {
        title: "1. HEALTHCARE SERVICES",
        content: "Provider agrees to provide healthcare services in accordance with applicable medical standards and regulations."
      },
      {
        title: "2. HIPAA COMPLIANCE",
        content: "All parties shall comply with HIPAA privacy and security requirements for protected health information."
      }
    ],
    legalRequirements: ["HIPAA compliance", "State medical licensing", "Medicare/Medicaid regulations", "FDA requirements"],
    governingAuthority: "HHS, CMS, State Health Departments, Medical Licensing Boards",
    lastUpdated: "2024-01-15"
  }
};

export default function ContractTemplatePage() {
  const params = useParams();
  const router = useRouter();
  const contractId = params.contractId as string;
  
  const template = contractTemplates[contractId];

  if (!template) {
    return (
      <div className="w-full max-w-6xl mx-auto px-4 py-6">
        <Card>
          <CardContent className="p-8 text-center">
            <FileText className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
            <h2 className="text-2xl font-bold mb-2">Template Not Found</h2>
            <p className="text-muted-foreground mb-4">
              The requested contract template could not be found.
            </p>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => router.back()}
              className="p-2 hover:bg-muted rounded-full"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const IconComponent = template.icon;

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => router.back()}
            className="p-2 hover:bg-muted rounded-full"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="flex items-center space-x-3">
            <IconComponent className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-3xl font-bold">{template.name}</h1>
              <Badge variant="secondary">{template.category}</Badge>
            </div>
          </div>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Printer className="h-4 w-4 mr-2" />
            Print
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
          <Button variant="outline" size="sm">
            <Share className="h-4 w-4 mr-2" />
            Share
          </Button>
        </div>
      </div>

      {/* Template Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Template Overview</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">{template.description}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-2">Governing Authority</h4>
              <p className="text-sm text-muted-foreground">{template.governingAuthority}</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Last Updated</h4>
              <p className="text-sm text-muted-foreground">{template.lastUpdated}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Elements */}
      <Card>
        <CardHeader>
          <CardTitle>Key Elements</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {template.keyElements.map((element, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-primary rounded-full" />
                <span className="text-sm">{element}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Standard Clauses */}
      <Card>
        <CardHeader>
          <CardTitle>Standard Contract Clauses</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {template.standardClauses.map((clause, index) => (
            <div key={index} className="space-y-2">
              <h4 className="font-semibold text-primary">{clause.title}</h4>
              <p className="text-sm leading-relaxed bg-muted/50 p-4 rounded-lg">
                {clause.content}
              </p>
              {index < template.standardClauses.length - 1 && <Separator />}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Legal Requirements */}
      <Card>
        <CardHeader>
          <CardTitle>Legal Requirements & Compliance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {template.legalRequirements.map((requirement, index) => (
              <div key={index} className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-amber-500 rounded-full mt-2" />
                <span className="text-sm">{requirement}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Disclaimer */}
      <Card className="border-amber-200 bg-amber-50 dark:bg-amber-950 dark:border-amber-800">
        <CardContent className="p-6">
          <div className="flex items-start space-x-3">
            <Shield className="h-5 w-5 text-amber-600 mt-0.5" />
            <div className="space-y-2">
              <h4 className="font-semibold text-amber-800 dark:text-amber-200">Legal Disclaimer</h4>
              <p className="text-sm text-amber-700 dark:text-amber-300">
                This template is provided for informational purposes only and does not constitute legal advice. 
                Always consult with qualified legal counsel before using any contract template. Laws vary by 
                jurisdiction and may change over time. The user assumes all responsibility for ensuring 
                compliance with applicable laws and regulations.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
