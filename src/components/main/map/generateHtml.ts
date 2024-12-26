export const getClusterIcon = (size: 'small' | 'large') => {
  if (size === 'large') {
    return `<div class="store-cluster-icon-large"></div>`;
  }
  return `<div class="store-cluster-icon-small"></div>`;
};
