import type { ReactNode, MouseEventHandler, CSSProperties } from 'react';
import clsx from 'clsx';
import classes from './textControl.scss';

export type TextComponent = 'h1' | 'h2' | 'h3' | 'h4' | 'div' | 'p' | 'label' | 'span';
export type TextVariant = 'h1' | 'h2' | 'body1' | 'body2' | 'body3';
export type TextColor =
  | 'default'
  | 'inherit'
  | 'dark'
  | 'light'
  | 'disabled'
  | 'placeholder';

export type TextWeight = 'regular' | 'medium' | 'semibold';

export interface TextControlProps {
  align?: 'left' | 'center' | 'right';
  children?: ReactNode;
  className?: string;
  color?: TextColor;
  component?: TextComponent;
  ellipsis?: boolean;
  disabled?: boolean;
  noWrap?: boolean;
  onClick?: MouseEventHandler;
  onMouseEnter?: MouseEventHandler;
  onMouseLeave?: MouseEventHandler;
  pointer?: boolean;
  style?: CSSProperties;
  underline?: boolean;
  variant?: TextVariant;
  weight?: TextWeight;
}

const componentToVariant: { [key in TextComponent]?: TextVariant } = {
  div: 'body1',
  p: 'body1',
  label: 'body2',
  span: 'body2',
};

function TextControl({
  children,
  className,
  style,
  component: Component = 'span',
  variant,
  align,
  color,
  ellipsis,
  noWrap,
  underline,
  weight = 'regular',
  disabled,
}: TextControlProps) {
  const sizing: TextVariant = variant || (componentToVariant[Component] as TextVariant);

  return (
    <Component
      style={style}
      title={ellipsis && typeof children === 'string' ? children : undefined}
      className={clsx(
        classes.root,
        classes[sizing],
        classes[weight],
        !!align && classes[align],
        !!color && classes[color],
        !!ellipsis && classes.ellipsis,
        !!noWrap && classes['no-wrap'],
        disabled && classes.disabled,
        className,
      )}>
      {underline ? <u>{children}</u> : children}
    </Component>
  );
}

export default TextControl;
