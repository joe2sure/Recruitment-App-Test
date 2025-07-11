import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { H1, H2, H3, Emphasis, ButtonText, Body, Faint } from '@/components/ui/typography';
import { Button } from '@/components/ui/button';

export function TypographyDemo() {
  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-8">
      <H1>Typography System</H1>
      <Body>This page demonstrates the typography system implemented according to the design specifications.</Body>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* H1 Example */}
        <Card>
          <CardHeader>
            <CardTitle>H1</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span>Font</span>
                <span>Inter</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Size</span>
                <span>32px</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Weight</span>
                <span>Bold</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Line Height</span>
                <span>40px</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Paragraph Spacing</span>
                <span>0px</span>
              </div>
              <div className="border-t pt-4 mt-4">
                <H1>The quick brown fox jumps over the lazy dog.</H1>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* H2 Example */}
        <Card>
          <CardHeader>
            <CardTitle>H2</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span>Font</span>
                <span>Inter</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Size</span>
                <span>24px</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Weight</span>
                <span>Bold</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Line Height</span>
                <span>32px</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Paragraph Spacing</span>
                <span>0px</span>
              </div>
              <div className="border-t pt-4 mt-4">
                <H2>The quick brown fox jumps over the lazy dog.</H2>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* H3 Example */}
        <Card>
          <CardHeader>
            <CardTitle>H3</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span>Font</span>
                <span>Inter</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Size</span>
                <span>20px</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Weight</span>
                <span>Bold</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Line Height</span>
                <span>28px</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Paragraph Spacing</span>
                <span>0px</span>
              </div>
              <div className="border-t pt-4 mt-4">
                <H3>The quick brown fox jumps over the lazy dog.</H3>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Emphasis Example */}
        <Card>
          <CardHeader>
            <CardTitle>Emphasis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span>Font</span>
                <span>Inter</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Size</span>
                <span>16px</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Weight</span>
                <span>Bold</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Line Height</span>
                <span>24px</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Paragraph Spacing</span>
                <span>0px</span>
              </div>
              <div className="border-t pt-4 mt-4">
                <Emphasis>The quick brown fox jumps over the lazy dog.</Emphasis>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Button Example */}
        <Card>
          <CardHeader>
            <CardTitle>Button</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span>Font</span>
                <span>Inter</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Size</span>
                <span>14px</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Weight</span>
                <span>Medium</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Line Height</span>
                <span>20px</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Paragraph Spacing</span>
                <span>0px</span>
              </div>
              <div className="border-t pt-4 mt-4">
                <Button>
                  <ButtonText>The quick brown fox jumps over the lazy dog</ButtonText>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Faint text Example */}
        <Card>
          <CardHeader>
            <CardTitle>Faint text</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span>Font</span>
                <span>Inter</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Size</span>
                <span>14px</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Weight</span>
                <span>Normal</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Line Height</span>
                <span>20px</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Paragraph Spacing</span>
                <span>0px</span>
              </div>
              <div className="border-t pt-4 mt-4">
                <Faint>The quick brown fox jumps over the lazy dog</Faint>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Body/Paragraph Example */}
        <Card>
          <CardHeader>
            <CardTitle>Body/Paragraph</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span>Font</span>
                <span>Inter</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Size</span>
                <span>16px</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Weight</span>
                <span>Regular</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Line Height</span>
                <span>24px</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Paragraph Spacing</span>
                <span>0px</span>
              </div>
              <div className="border-t pt-4 mt-4">
                <Body>The quick brown fox jumps over the lazy dog.</Body>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
