interface ShowProps {
  when: boolean;
  fallback?: JSX.Element;
  children: JSX.Element;
}

export default function Show({ when, children, fallback }: ShowProps) {
  if (when) {
    return children;
  }

  return fallback ? fallback : <></>;
}
