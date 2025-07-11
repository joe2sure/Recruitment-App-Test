import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { H2, H3, Body } from '@/components/ui/typography';

export function ColorDemo() {
  const colorGroups = [
    {
      name: 'Primary',
      colors: [
        { name: 'Primary', class: 'bg-primary', textClass: 'text-white' },
        { name: 'Primary 500', class: 'bg-primary-500', textClass: 'text-white' },
      ]
    },
    {
      name: 'Secondary',
      colors: [
        { name: 'Secondary', class: 'bg-secondary', textClass: 'text-white' },
        { name: 'Secondary 500', class: 'bg-secondary-500', textClass: 'text-white' },
        { name: 'Secondary 400', class: 'bg-secondary-400', textClass: 'text-white' },
        { name: 'Secondary 300', class: 'bg-secondary-300', textClass: 'text-black' },
      ]
    },
    {
      name: 'Status',
      colors: [
        { name: 'Error', class: 'bg-error', textClass: 'text-white' },
        { name: 'Error 500', class: 'bg-error-500', textClass: 'text-white' },
        { name: 'Success', class: 'bg-success', textClass: 'text-white' },
        { name: 'Success 500', class: 'bg-success-500', textClass: 'text-white' },
      ]
    },
    {
      name: 'Text',
      colors: [
        { name: 'Text', class: 'bg-text', textClass: 'text-white' },
        { name: 'Text Primary', class: 'bg-text-primary', textClass: 'text-white' },
        { name: 'Text Secondary', class: 'bg-text-secondary', textClass: 'text-black' },
      ]
    }
  ];

  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-8">
      <H2>Color System</H2>
      <Body>This page demonstrates the color system defined in the tailwind configuration.</Body>
      
      <div className="space-y-8">
        {colorGroups.map((group, index) => (
          <div key={index} className="space-y-4">
            <H3>{group.name}</H3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {group.colors.map((color, colorIndex) => (
                <Card key={colorIndex} className="overflow-hidden">
                  <div className={`h-24 ${color.class} flex items-end p-3`}>
                    <span className={`${color.textClass} font-medium`}>{color.name}</span>
                  </div>
                  <CardContent className="p-3">
                    <div className="text-xs font-mono">{color.class}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
