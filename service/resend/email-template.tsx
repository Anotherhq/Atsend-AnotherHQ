import * as React from 'react';

interface EmailTemplateProps {
  firstName: string;
  message: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  firstName,
  message
}) => (
  <div>
    <h1 className='text-lg'>Welcome, {firstName}!</h1>
    {"\n"}
    <p>{message}</p>
    <p></p>
  </div>
);