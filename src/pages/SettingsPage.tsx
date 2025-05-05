import React from 'react';
import { User, Globe, Mail } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { Card, CardContent, CardHeader } from '../components/ui/Card';

const SettingsPage: React.FC = () => {
  const { currentUser } = useAuth();
  
  if (!currentUser) {
    return null;
  }
  
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-900">Account Settings</h1>
      
      <Card className="border border-slate-200">
        <CardHeader>
          <h2 className="text-lg font-semibold text-slate-900">Profile Information</h2>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row sm:items-center mb-6">
            <div className="h-20 w-20 bg-blue-100 rounded-full flex items-center justify-center mr-6">
              <User className="h-10 w-10 text-blue-600" />
            </div>
            <div>
              <h3 className="text-xl font-medium text-slate-900">{currentUser.name}</h3>
              <p className="text-slate-600">Manage your account settings</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center p-4 bg-slate-50 rounded-md">
              <div className="flex items-center mb-2 sm:mb-0 sm:mr-6">
                <Mail className="h-5 w-5 text-slate-400 mr-2" />
                <span className="text-sm font-medium text-slate-500">Email Address</span>
              </div>
              <div className="sm:ml-auto">
                <span className="text-slate-900">{currentUser.email}</span>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row sm:items-center p-4 bg-slate-50 rounded-md">
              <div className="flex items-center mb-2 sm:mb-0 sm:mr-6">
                <Globe className="h-5 w-5 text-slate-400 mr-2" />
                <span className="text-sm font-medium text-slate-500">Country</span>
              </div>
              <div className="sm:ml-auto">
                <span className="text-slate-900">{currentUser.country}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="mt-8 text-center text-sm text-slate-500">
        <p>
          This is a demo application. In a real-world scenario, this page would include options to update your profile, change your password, and manage notification settings.
        </p>
      </div>
    </div>
  );
};

export default SettingsPage;