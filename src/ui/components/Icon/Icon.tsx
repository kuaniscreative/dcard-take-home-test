import clsx from 'clsx';
import { IconDefinition } from '@@icons/typings';
import classes from './icon.scss';

export interface IconProps {
  className?: string;
  icon: IconDefinition;
  spin?: boolean;
}

function Icon(props: IconProps) {
  const {
    className,
    icon,
    spin = false,
  } = props;

  const { definition } = icon;

  return (
    <i
      aria-hidden
      className={clsx(
        classes.root,
        {
          [classes.spin]: spin,
        },
        className,
      )}>
      <svg
        {...definition.svg}
        focusable={false}>
        <path {...definition.path} />
      </svg>
    </i>
  );
}

export default Icon;
