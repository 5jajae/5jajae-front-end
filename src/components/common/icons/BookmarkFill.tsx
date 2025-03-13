import BookmarkFillSVGIcon from '@public/svg/icons/icon_bookmark_fill.svg';
import { ColorsType, theme } from '~/style/theme';

interface IconProps {
  size?: string;
  color?: keyof ColorsType;
}
export default function BookmarkFill({ size, color }: IconProps) {
  const width = size ?? '24px';
  const height = size ?? '24px';
  const fill = theme.colors[color ?? 'black'];
  return <BookmarkFillSVGIcon width={width} height={height} fill={fill} />;
}
