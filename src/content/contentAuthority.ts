import React from 'react';
import { contentRegistry } from './contentRegistry';
import { ContentEntry } from './authorizedContent';

export interface AuthorizedTextProps {
  id?: string;
  content?: ContentEntry;
  style?: React.CSSProperties;
  className?: string;
}

/**
 * AuthorizedText Component (V14)
 * Hard enforcement gate: Renders textual content strictly from the authorized registry.
 * Prevents arbitrary string literals from ever reaching production JSX.
 */
export const AuthorizedText: React.FC<AuthorizedTextProps> = ({
  id,
  content,
  style,
  className,
}) => {
  let text = '';

  if (content && content.text) {
    text = content.text;
  } else if (id) {
    text = contentRegistry.getText(id);
  } else {
    throw new Error('[ContentAuthority] AuthorizedText requires either `id` or `content` prop.');
  }

  return React.createElement('span', { style, className }, text);
};
