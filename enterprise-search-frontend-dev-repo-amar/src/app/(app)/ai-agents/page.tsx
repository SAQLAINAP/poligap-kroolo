"use client";

import React, { useState } from "react";
import { Bot, Plus, Settings, Play, Pause, Trash2, Edit, Eye } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface AIAgent {
  id: string;
  name: string;
  description: string;
  type: "compliance" | "contract" | "legal-research" | "document-analysis";
  status: "active" | "inactive" | "training";
  accuracy: number;
  tasksCompleted: number;
  createdDate: string;
  lastActive: string;
  specialization: string[];
}

// Dynamic agents will be loaded from API or user creation
const initialAgents: AIAgent[] = [];

export default function AIAgentsPage() {
  const [agents, setAgents] = useState<AIAgent[]>(initialAgents);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newAgent, setNewAgent] = useState({
    name: "",
    description: "",
    type: "compliance" as AIAgent["type"],
    specialization: ""
  });

  const filteredAgents = agents.filter(agent => {
    const matchesSearch = agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         agent.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (activeTab === "all") return matchesSearch;
    return matchesSearch && agent.status === activeTab;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "inactive": return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
      case "training": return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "compliance": return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300";
      case "contract": return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300";
      case "legal-research": return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case "document-analysis": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
    }
  };

  const handleCreateAgent = () => {
    const agent: AIAgent = {
      id: Date.now().toString(),
      name: newAgent.name,
      description: newAgent.description,
      type: newAgent.type,
      status: "training",
      accuracy: Math.floor(Math.random() * 20) + 70, // Random accuracy between 70-90%
      tasksCompleted: 0,
      createdDate: new Date().toISOString().split('T')[0],
      lastActive: new Date().toISOString().split('T')[0],
      specialization: newAgent.specialization.split(',').map(s => s.trim()).filter(s => s)
    };
    
    setAgents([agent, ...agents]);
    setNewAgent({ name: "", description: "", type: "compliance", specialization: "" });
    setIsCreateDialogOpen(false);
  };

  const toggleAgentStatus = (agentId: string) => {
    setAgents(agents.map(agent => 
      agent.id === agentId 
        ? { ...agent, status: agent.status === "active" ? "inactive" : "active" as AIAgent["status"] }
        : agent
    ));
  };

  const deleteAgent = (agentId: string) => {
    setAgents(agents.filter(agent => agent.id !== agentId));
  };

  return (
    <div className="w-full max-w-none p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <Bot className="h-6 w-6" />
            AI Agents
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage and deploy specialized AI agents for legal and compliance tasks
          </p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Legal Agent
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create New AI Agent</DialogTitle>
              <DialogDescription>
                Configure a new AI agent for specific legal or compliance tasks.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Agent Name</Label>
                <Input
                  id="name"
                  value={newAgent.name}
                  onChange={(e) => setNewAgent({ ...newAgent, name: e.target.value })}
                  placeholder="e.g., GDPR Compliance Agent"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="type">Agent Type</Label>
                <Select value={newAgent.type} onValueChange={(value: AIAgent["type"]) => setNewAgent({ ...newAgent, type: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select agent type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="compliance">Compliance</SelectItem>
                    <SelectItem value="contract">Contract Analysis</SelectItem>
                    <SelectItem value="legal-research">Legal Research</SelectItem>
                    <SelectItem value="document-analysis">Document Analysis</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newAgent.description}
                  onChange={(e) => setNewAgent({ ...newAgent, description: e.target.value })}
                  placeholder="Describe what this agent specializes in..."
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="specialization">Specializations (comma-separated)</Label>
                <Input
                  id="specialization"
                  value={newAgent.specialization}
                  onChange={(e) => setNewAgent({ ...newAgent, specialization: e.target.value })}
                  placeholder="e.g., GDPR, Data Protection, Privacy Rights"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateAgent} disabled={!newAgent.name || !newAgent.description}>
                Create Agent
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search and Filters */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Input
            placeholder="Search agents..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
          <Bot className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        </div>
      </div>

      {/* Agent Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">All Agents</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="training">Training</TabsTrigger>
          <TabsTrigger value="inactive">Inactive</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="space-y-4">
          {filteredAgents.length === 0 ? (
            <Card>
              <CardContent className="flex items-center justify-center py-12">
                <div className="text-center">
                  <Bot className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-muted-foreground">No agents found</h3>
                  <p className="text-sm text-muted-foreground">
                    {searchTerm ? "Try adjusting your search terms" : "Create your first AI agent to get started"}
                  </p>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredAgents.map((agent) => (
                <Card key={agent.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <CardTitle className="text-lg flex items-center gap-2">
                          <Bot className="h-5 w-5" />
                          {agent.name}
                        </CardTitle>
                        <CardDescription className="text-sm">
                          {agent.description}
                        </CardDescription>
                      </div>
                      <div className="flex gap-1">
                        <Badge className={getStatusColor(agent.status)}>
                          {agent.status}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Badge className={getTypeColor(agent.type)}>
                        {agent.type.replace("-", " ")}
                      </Badge>
                      <span className="text-sm text-muted-foreground">
                        {agent.accuracy}% accuracy
                      </span>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Tasks Completed:</span>
                        <span className="font-medium">{agent.tasksCompleted}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Last Active:</span>
                        <span>{new Date(agent.lastActive).toLocaleDateString()}</span>
                      </div>
                    </div>

                    {agent.specialization.length > 0 && (
                      <div>
                        <p className="text-xs text-muted-foreground mb-2">Specializations:</p>
                        <div className="flex flex-wrap gap-1">
                          {agent.specialization.slice(0, 3).map((spec, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {spec}
                            </Badge>
                          ))}
                          {agent.specialization.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{agent.specialization.length - 3} more
                            </Badge>
                          )}
                        </div>
                      </div>
                    )}

                    <div className="flex gap-2 pt-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => toggleAgentStatus(agent.id)}
                        className="flex-1"
                      >
                        {agent.status === "active" ? (
                          <>
                            <Pause className="h-4 w-4 mr-1" />
                            Pause
                          </>
                        ) : (
                          <>
                            <Play className="h-4 w-4 mr-1" />
                            Activate
                          </>
                        )}
                      </Button>
                      <Button variant="outline" size="sm">
                        <Settings className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => deleteAgent(agent.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
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
