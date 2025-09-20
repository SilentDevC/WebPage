import React from 'react';
import { Leaf } from 'lucide-react';

const LeafPattern = () => (
  <>
    <Leaf className="absolute top-1/4 left-8 -translate-x-1/2 -translate-y-1/2 w-32 h-32 text-primary/5 opacity-50 rotate-[-20deg]" />
    <Leaf className="absolute top-12 right-12 w-24 h-24 text-primary/5 opacity-40 rotate-[30deg]" />
    <Leaf className="absolute bottom-16 left-16 w-20 h-20 text-primary/5 opacity-30 rotate-[10deg]" />
    <Leaf className="absolute bottom-1/4 right-8 translate-x-1/2 translate-y-1/2 w-48 h-48 text-primary/5 opacity-20 rotate-[-40deg]" />
  </>
);

export default LeafPattern;