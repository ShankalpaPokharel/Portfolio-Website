import * as React from 'react';

interface EmailTemplateProps {
  message: string;
  interest: string;
  fullName:string;
  email:string;
}
export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  message,
  interest,
  fullName,
  email
}) => (
  <div className="p-6 bg-gray-100 text-gray-800 font-sans">
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl font-bold mb-4">New Message from Your Portfolio</h2>
      <p className="mb-2">
        <strong>Message From:</strong> {fullName}
      </p>
      <p className="mb-2">
        <strong>Email Address:</strong> {email}
      </p>
      <p className="mb-2">
        <strong>Interested In:</strong> {interest}
      </p>
      <div className="mt-4">
        <strong>Message:</strong>
        <p className="mt-2">{message}</p>
      </div>
    </div>
    <hr />
    <div className="mt-6 text-center">
      <p className="text-sm text-gray-500">You received this message through your portfolio website.</p>
    </div>
  </div>
);
