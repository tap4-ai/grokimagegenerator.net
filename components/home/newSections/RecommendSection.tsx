/* eslint-disable @typescript-eslint/indent */
/* eslint-disable react/jsx-indent */
import { ArrowUpRight, MapPin } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { cn } from '@/lib/utils';
import { Link } from '@/i18n/navigation';

type BlogData = {
  id: string;
  title: string;
  content: string;
  tagsList?: string[] | string;
};

export const homeBlogData: BlogData[] = [
  {
    id: 'Experience-Flux-1-1-Pro-Ultra-for-Free%3A-A-Guide-to-Unleashing-Creative-Potential-e76d5e2d10de',
    title: 'Experience Flux 1.1 Pro Ultra for Free: A Guide to Unleashing Creative Potential',
    content:
      'Flux 1.1 Pro Ultra Free is an advanced AI image generator that excels in producing high-resolution outputs and rapid image creation.',
    tagsList: ['Flux AI Image Generator', 'Flux AI Generator', 'Flux 1.1 Pro  AI', 'Flux.1 AI Prompt'],
  },
  {
    id: 'Image-to-Prompt-Generator%3A-Unlocking-AI-Image-Creation-81ec4fc58db7',
    title: 'Image to Prompt Generator: Unlocking AI Image Creation',
    content:
      'Image to prompt generator is a revolutionary tool in the field of AI image creation, offering significant enhancements to the creative process',
    tagsList: ['Flux AI Image Generator', 'Flux AI Generator', 'Flux 1.1 Pro  AI', 'Flux.1 AI Prompt'],
  },
  {
    id: 'Flux-1-1-Pro-Ultra-Now-Live-on-Flux-Pro-AI-f89c309e23db',
    title: 'Flux 1.1 Pro Ultra Now Live on Flux Pro AI',
    content: 'The Flux 1.1 Pro Ultra has officially launched on the Flux Pro AI platform as of November 11, 2024.',
    tagsList: ['Flux AI', 'Flux 1.1 Pro', 'Flux Pro AI', 'Flux 1.1 Pro Ultra'],
  },
  {
    id: 'Leveraging-Flux-Pro-AI-and-Runway-Gen3-for-Advanced-Image-to-Video-AI-Generation-9eacf5883289',
    title: 'Leveraging Flux Pro AI and Runway Gen3 for Advanced Image-to-Video AI Generation',
    content:
      'Flux 1.1 Pro, developed by Black Forest Labs, is a cutting-edge AI model that transforms text prompts into high-quality images.',
    tagsList: ['Flux AI', 'Flux 1.1 Pro', 'Flux Pro AI', 'Flux Prompt'],
  },
  {
    id: '-How-to-Generate-Videos-Using-Flux-AI-Video-Generator-1a15a4e49e53',
    title: 'How to Generate Videos Using Flux AI Video Generator',
    content: 'Flux AI Video Generator is a powerful tool that transforms text and images into high-quality videos.',
    tagsList: ['Flux AI', 'Flux 1.1 Pro', 'Flux Pro AI', 'Flux AI Video Generator'],
  },
  {
    id: 'Flux-Pro-AI%3A-Optimized-Flux-1-1-Pro-Online-Tool-Powered-by-fal-ai-80dadfdcf366',
    title: 'Flux Pro AI: Optimized Flux 1.1 Pro Online Tool Powered by fal.ai',
    content:
      'Flux 1.1 Pro, developed by Black Forest Labs, marks a significant advancement in AI-powered image generation.',
    tagsList: ['Flux AI', 'Flux 1.1 Pro', 'Flux Pro AI', 'fal ai'],
  },
  {
    id: 'How-to-Design-Prompts-for-Flux-1-1-Pro-0a16b61b16e6',
    title: 'How to Design Prompts for Flux 1.1 Pro',
    content:
      'Flux 1.1 Pro, developed by Black Forest Labs, is a cutting-edge AI model that transforms text prompts into high-quality images.',
    tagsList: ['Flux AI', 'Flux 1.1 Pro', 'Flux Pro AI', 'Flux Prompt'],
  },
  {
    id: 'Exploring-the-Flux-AI-Video-Generator%3A-A-Guide-to-Creating-Videos-be66efb57a58',
    title: 'Exploring the Flux AI Video Generator: A Guide to Creating Videos',
    content: 'Creating AI-generated videos has never been easier, thanks to the Flux AI Video Generator.',
    tagsList: ['Flux AI', 'Flux Video AI', 'Flux AI Video Generator', 'Flux Pro AI'],
  },
  {
    id: '-How-to-Design-Effective-Prompts-for-Flux-1-Dev-12193866342d',
    title: 'How to Design Effective Prompts for Flux.1 Dev',
    content: 'Flux.1 Dev is an advanced development environment tailored for generating AI-driven images.',
    tagsList: ['Flux AI', 'Flux Pro AI', 'Flux.1 Dev', 'Flux Prompt'],
  },
  {
    id: 'Best-Prompts-of-Flux1-AI-for-Flux-Images-—-February-25-2025-a74c6b0ce003',
    title: 'Best Prompts of Flux.1 AI for Flux Images — February 25, 2025',
    content: 'Explore top 6 best prompts for Black Forest Labs FLUX AI image model. February 25, 2025',
    tagsList: ['Flux AI', 'Flux 1.1 Pro', 'Flux Pro AI', 'Flux.1 AI'],
  },
  {
    id: 'Best-Prompts-of-Flux1-AI-for-Flux-Images-—-February-24-2025-000ca0a82d91',
    title: 'Best Prompts of Flux.1 AI for Flux Images — February 24, 2025',
    content: 'Explore top 6 best prompts for Black Forest Labs FLUX AI image model. February 24, 2025',
    tagsList: ['Flux AI', 'Flux 1.1 Pro', 'Flux AI Prompt', 'Flux Pro AI Prompt'],
  },
  {
    id: 'Features-of-the-Advanced-Model%3A-Flux-1-1-Pro-0aae86ef1660',
    title: 'Features of the Advanced Model: Flux 1.1 Pro',
    content:
      'Flux 1.1 Pro is an advanced AI-powered text-to-image model that marks a significant advancement in AI image generation.',
    tagsList: ['Flux AI', 'Flux 1.1 Pro', 'Flux Pro AI', 'Flux.1 AI'],
  },
  {
    id: 'Stable-Diffusion-3-5-vs--Flux-1-1-Pro%3A-A-Comprehensive-Analysis-94abe834ef08',
    title: 'Stable Diffusion 3.5 vs. Flux 1.1 Pro: A Comprehensive Analysis',
    content:
      'Stable Diffusion 3.5 and Flux 1.1 Pro have emerged as leading models, each offering distinct features and improvements.',
    tagsList: ['Flux AI', 'Flux 1.1 Pro', 'Stable Diffusion 3.5', 'SD 3.5'],
  },
  {
    id: 'How-to-Experience-FLUX-1-1-Pro-Online-for-Free-1ce175c4e868',
    title: 'How to Experience FLUX 1.1 Pro Online for Free',
    content:
      'FLUX 1.1 Pro, developed by Black Forest Labs, is a cutting-edge AI image generator that transforms text descriptions into high-quality, realistic images.',
    tagsList: ['Flux 1.1 Pro', 'Flux.1 AI', 'Flux Pro', 'Free Flux AI'],
  },
  {
    id: 'FLUX-1-1-Pro%3A-The-Advanced-Model-in-FLUX-AI-Image-Generator-6b50888bcffa',
    title: 'FLUX 1.1 Pro: The Advanced Model in FLUX AI Image Generator',
    content:
      'FLUX 1.1 Pro is the latest and most advanced version of the FLUX AI image generation model developed by Black Forest Labs.',
    tagsList: ['Flux 1.1 pro', 'Flux.1 AI', 'AI Image Generation', 'Black Forest Labs'],
  },
  {
    id: 'FLUX-1-Dev%3A-An-Advanced-AI-Image-Generator-Model-b0177cd33b9a',
    title: 'FLUX.1 Dev: An Advanced AI Image Generator Model',
    content: 'FLUX.1 Dev is an advanced version of the FLUX AI image generation model developed by Black Forest Labs.',
    tagsList: ['Flux.1 Dev', 'Flux.1 AI', 'AI Image Generation', 'Black Forest Labs'],
  },
  {
    id: 'FLUX-1-Schnell%3A-The-Advanced-Light-AI-Image-Generator-Model-edac727b7ba1',
    title: 'FLUX.1 Schnell: The Advanced Light AI Image Generator Model',
    content:
      'FLUX.1 Schnell is one of the innovative models in the FLUX AI image generation suite developed by Black Forest Labs.',
    tagsList: ['Flux.1 Schnell', 'Flux.1 AI', 'AI Image Generation', 'Black Forest Labs'],
  },
  {
    id: 'FLUX-1-Pro%3A-The-Ultimate-AI-Image-Generator-for-High-Quality-Visuals-0e6777cfc19d',
    title: 'FLUX.1 Pro: The Ultimate AI Image Generator for High-Quality Visuals',
    content:
      'Flux.1 Pro, developed by Black Forest Labs, this advanced AI image generation model delivers high-quality visuals.',
    tagsList: ['Flux.1 Pro', 'Flux.1 AI', 'AI Image Generation', 'Black Forest Labs'],
  },
];

export const fluxImageBlogData: BlogData[] = [
  {
    id: 'Experience-Flux-1-1-Pro-Ultra-for-Free%3A-A-Guide-to-Unleashing-Creative-Potential-e76d5e2d10de',
    title: 'Experience Flux 1.1 Pro Ultra for Free: A Guide to Unleashing Creative Potential',
    content:
      'Flux 1.1 Pro Ultra Free is an advanced AI image generator that excels in producing high-resolution outputs and rapid image creation.',
    tagsList: ['Flux AI Image Generator', 'Flux AI Generator', 'Flux 1.1 Pro  AI', 'Flux.1 AI Prompt'],
  },
  {
    id: 'Image-to-Prompt-Generator%3A-Unlocking-AI-Image-Creation-81ec4fc58db7',
    title: 'Image to Prompt Generator: Unlocking AI Image Creation',
    content:
      'Image to prompt generator is a revolutionary tool in the field of AI image creation, offering significant enhancements to the creative process',
    tagsList: ['Flux AI Image Generator', 'Flux AI Generator', 'Flux 1.1 Pro  AI', 'Flux.1 AI Prompt'],
  },
  {
    id: 'Flux-1-1-Pro-Ultra-Now-Live-on-Flux-Pro-AI-f89c309e23db',
    title: 'Flux 1.1 Pro Ultra Now Live on Flux Pro AI',
    content: 'The Flux 1.1 Pro Ultra has officially launched on the Flux Pro AI platform as of November 11, 2024.',
    tagsList: ['Flux AI', 'Flux 1.1 Pro', 'Flux Pro AI', 'Flux 1.1 Pro Ultra'],
  },
  {
    id: 'Flux-Pro-AI%3A-Optimized-Flux-1-1-Pro-Online-Tool-Powered-by-fal-ai-80dadfdcf366',
    title: 'Flux Pro AI: Optimized Flux 1.1 Pro Online Tool Powered by fal.ai',
    content:
      'Flux 1.1 Pro, developed by Black Forest Labs, marks a significant advancement in AI-powered image generation.',
    tagsList: ['Flux AI', 'Flux 1.1 Pro', 'Flux Pro AI', 'fal ai'],
  },
  {
    id: 'How-to-Design-Prompts-for-Flux-1-1-Pro-0a16b61b16e6',
    title: 'How to Design Prompts for Flux 1.1 Pro',
    content:
      'Flux 1.1 Pro, developed by Black Forest Labs, is a cutting-edge AI model that transforms text prompts into high-quality images.',
    tagsList: ['Flux AI', 'Flux 1.1 Pro', 'Flux Pro AI', 'Flux Prompt'],
  },
  {
    id: '-How-to-Design-Effective-Prompts-for-Flux-1-Dev-12193866342d',
    title: 'How to Design Effective Prompts for Flux.1 Dev',
    content: 'Flux.1 Dev is an advanced development environment tailored for generating AI-driven images.',
    tagsList: ['Flux AI', 'Flux Pro AI', 'Flux.1 Dev', 'Flux Prompt'],
  },
  {
    id: 'Features-of-the-Advanced-Model%3A-Flux-1-1-Pro-0aae86ef1660',
    title: 'Features of the Advanced Model: Flux 1.1 Pro',
    content:
      'Flux 1.1 Pro is an advanced AI-powered text-to-image model that marks a significant advancement in AI image generation.',
    tagsList: ['Flux AI', 'Flux 1.1 Pro', 'Flux Pro AI', 'Flux.1 AI'],
  },
  {
    id: 'Best-Prompts-of-Flux1-AI-for-Flux-Images-—-October-26-2024-f125cbda3da0',
    title: 'Best Prompts of Flux Pro AI for Flux Images — October 26, 2024',
    content: 'Explore top 20 best prompts for FLUX AI image model. October 26, 2024.',
    tagsList: ['Flux AI', 'Flux 1.1 Pro', 'Flux AI Prompt', 'Flux Pro Prompt'],
  },
  {
    id: 'How-to-Experience-FLUX-1-1-Pro-Online-for-Free-1ce175c4e868',
    title: 'How to Experience FLUX 1.1 Pro Online for Free',
    content:
      'FLUX 1.1 Pro, developed by Black Forest Labs, is a cutting-edge AI image generator that transforms text descriptions into high-quality, realistic images.',
    tagsList: ['Flux 1.1 Pro', 'Flux.1 AI', 'Flux Pro', 'Free Flux AI'],
  },
  {
    id: 'Best-Prompts-of-Flux1-AI-for-Flux-Images-—-February-25-2025-a74c6b0ce003',
    title: 'Best Prompts of Flux.1 AI for Flux Images — February 25, 2025',
    content: 'Explore top 6 best prompts for Black Forest Labs FLUX AI image model. February 25, 2025',
    tagsList: ['Flux AI', 'Flux 1.1 Pro', 'Flux Pro AI', 'Flux.1 AI'],
  },
  {
    id: 'Best-Prompts-of-Flux1-AI-for-Flux-Images-—-February-24-2025-000ca0a82d91',
    title: 'Best Prompts of Flux.1 AI for Flux Images — February 24, 2025',
    content: 'Explore top 6 best prompts for Black Forest Labs FLUX AI image model. February 24, 2025',
    tagsList: ['Flux AI', 'Flux 1.1 Pro', 'Flux AI Prompt', 'Flux Pro AI Prompt'],
  },
  {
    id: 'FLUX-1-1-Pro%3A-The-Advanced-Model-in-FLUX-AI-Image-Generator-6b50888bcffa',
    title: 'FLUX 1.1 Pro: The Advanced Model in FLUX AI Image Generator',
    content:
      'FLUX 1.1 Pro is the latest and most advanced version of the FLUX AI image generation model developed by Black Forest Labs.',
    tagsList: ['Flux 1.1 pro', 'Flux.1 AI', 'AI Image Generation', 'Black Forest Labs'],
  },
  {
    id: 'FLUX-1-Dev%3A-An-Advanced-AI-Image-Generator-Model-b0177cd33b9a',
    title: 'FLUX.1 Dev: An Advanced AI Image Generator Model',
    content: 'FLUX.1 Dev is an advanced version of the FLUX AI image generation model developed by Black Forest Labs.',
    tagsList: ['Flux.1 Dev', 'Flux.1 AI', 'AI Image Generation', 'Black Forest Labs'],
  },
  {
    id: 'FLUX-1-Schnell%3A-The-Advanced-Light-AI-Image-Generator-Model-edac727b7ba1',
    title: 'FLUX.1 Schnell: The Advanced Light AI Image Generator Model',
    content:
      'FLUX.1 Schnell is one of the innovative models in the FLUX AI image generation suite developed by Black Forest Labs.',
    tagsList: ['Flux.1 Schnell', 'Flux.1 AI', 'AI Image Generation', 'Black Forest Labs'],
  },
  {
    id: 'FLUX-1-Pro%3A-The-Ultimate-AI-Image-Generator-for-High-Quality-Visuals-0e6777cfc19d',
    title: 'FLUX.1 Pro: The Ultimate AI Image Generator for High-Quality Visuals',
    content:
      'Flux.1 Pro, developed by Black Forest Labs, this advanced AI image generation model delivers high-quality visuals.',
    tagsList: ['Flux.1 Pro', 'Flux.1 AI', 'AI Image Generation', 'Black Forest Labs'],
  },
];

export const fluxVideoBlogData: BlogData[] = [
  {
    id: 'Leveraging-Flux-Pro-AI-and-Runway-Gen3-for-Advanced-Image-to-Video-AI-Generation-9eacf5883289',
    title: 'Leveraging Flux Pro AI and Runway Gen3 for Advanced Image-to-Video AI Generation',
    content:
      'Flux 1.1 Pro, developed by Black Forest Labs, is a cutting-edge AI model that transforms text prompts into high-quality images.',
    tagsList: ['Flux AI', 'Flux 1.1 Pro', 'Flux Pro AI', 'Flux Prompt'],
  },
  {
    id: 'Exploring-the-Flux-AI-Video-Generator%3A-A-Guide-to-Creating-Videos-be66efb57a58',
    title: 'Exploring the Flux AI Video Generator: A Guide to Creating Videos',
    content: 'Creating AI-generated videos has never been easier, thanks to the Flux AI Video Generator.',
    tagsList: ['Flux AI', 'Flux Video AI', 'Flux AI Video Generator', 'Flux Pro AI'],
  },
];

export const fluxPromptBlogData: BlogData[] = [
  {
    id: 'How-to-Design-Prompts-for-Flux-1-1-Pro-0a16b61b16e6',
    title: 'How to Design Prompts for Flux 1.1 Pro',
    content:
      'Flux 1.1 Pro, developed by Black Forest Labs, is a cutting-edge AI model that transforms text prompts into high-quality images.',
    tagsList: ['Flux AI', 'Flux 1.1 Pro', 'Flux Pro AI', 'Flux Prompt'],
  },
  {
    id: 'Exploring-the-Flux-AI-Video-Generator%3A-A-Guide-to-Creating-Videos-be66efb57a58',
    title: 'Exploring the Flux AI Video Generator: A Guide to Creating Videos',
    content: 'Creating AI-generated videos has never been easier, thanks to the Flux AI Video Generator.',
    tagsList: ['Flux AI', 'Flux Video AI', 'Flux AI Video Generator', 'Flux Pro AI'],
  },
  {
    id: '-How-to-Design-Effective-Prompts-for-Flux-1-Dev-12193866342d',
    title: 'How to Design Effective Prompts for Flux.1 Dev',
    content: 'Flux.1 Dev is an advanced development environment tailored for generating AI-driven images.',
    tagsList: ['Flux AI', 'Flux Pro AI', 'Flux.1 Dev', 'Flux Prompt'],
  },
  {
    id: 'Best-Prompts-of-Flux1-AI-for-Flux-Images-—-October-29-2024-27079acb948e',
    title: 'Best Prompts of Flux.1 AI for Flux Images — October 29, 2024',
    content: 'Explore top 13 best prompts for Black Forest Labs FLUX AI image model. October 29, 2024',
    tagsList: ['Flux AI', 'Flux 1.1 Pro', 'Flux Pro AI', 'Flux.1 AI'],
  },
];

export const fluxDetailBlogData: BlogData[] = [
  {
    id: 'Best-Prompts-of-Flux1-AI-for-Flux-Images-—-November-13-2024-e821d261b3ca',
    title: 'Best Prompts of Flux.1 AI for Flux Images — November 13, 2024',
    content: 'Explore top 14 best prompts for Black Forest Labs FLUX AI image model. November 13, 2024',
    tagsList: ['Flux AI', 'Flux 1.1 Pro', 'Flux Pro AI', 'Flux Prompts'],
  },
  {
    id: 'Best-Prompts-of-Flux1-AI-for-Flux-Images-—-November-12-2024-3582ae62d119',
    title: 'Best Prompts of Flux.1 AI for Flux Images — November 12, 2024',
    content: 'Explore top 13 best prompts for Black Forest Labs FLUX AI image model. November 12, 2024',
    tagsList: ['Flux AI', 'Flux 1.1 Pro', 'Flux Pro AI', 'Flux.1 AI'],
  },
  {
    id: 'Best-Prompts-of-Flux1-AI-for-Flux-Images-—-October-29-2024-27079acb948e',
    title: 'Best Prompts of Flux.1 AI for Flux Images — October 29, 2024',
    content: 'Explore top 13 best prompts for Black Forest Labs FLUX AI image model. October 29, 2024',
    tagsList: ['Flux AI', 'Flux 1.1 Pro', 'Flux Pro AI', 'Flux.1 AI'],
  },
  {
    id: 'Best-Prompts-of-Flux1-AI-for-Flux-Images-—-October-27-2024-263b3ae16889',
    title: 'Best Prompts of Flux.1 AI for Flux Images — October 27, 2024',
    content: 'Explore top 20 best prompts for Black Forest Labs FLUX AI image model. October 27, 2024',
    tagsList: ['Flux AI', 'Flux 1.1 Pro', 'Flux Pro AI', 'Flux.1 AI'],
  },
];

export const fluxImageToPromptBlogData: BlogData[] = [
  {
    id: 'Experience-Flux-1-1-Pro-Ultra-for-Free%3A-A-Guide-to-Unleashing-Creative-Potential-e76d5e2d10de',
    title: 'Experience Flux 1.1 Pro Ultra for Free: A Guide to Unleashing Creative Potential',
    content:
      'Flux 1.1 Pro Ultra Free is an advanced AI image generator that excels in producing high-resolution outputs and rapid image creation.',
    tagsList: ['Flux AI', 'Flux 1.1 Pro', 'Flux 1.1 Pro Ultra', 'Flux 1.1 Pro Prompt'],
  },
  {
    id: 'Image-to-Prompt-Generator%3A-Unlocking-AI-Image-Creation-81ec4fc58db7',
    title: 'Image to Prompt Generator: Unlocking AI Image Creation',
    content:
      'Image to prompt generator is a revolutionary tool in the field of AI image creation, offering significant enhancements to the creative process',
    tagsList: ['Flux AI', 'Flux 1.1 Pro', 'Flux 1.1 Pro Ultra', 'Image to Prompt'],
  },
  {
    id: 'How-to-Design-Prompts-for-Flux-1-1-Pro-0a16b61b16e6',
    title: 'How to Design Prompts for Flux 1.1 Pro',
    content:
      'Flux 1.1 Pro, developed by Black Forest Labs, is a cutting-edge AI model that transforms text prompts into high-quality images.',
    tagsList: ['Flux AI', 'Flux 1.1 Pro', 'Flux Pro AI', 'Flux Prompt'],
  },
  {
    id: '-How-to-Design-Effective-Prompts-for-Flux-1-Dev-12193866342d',
    title: 'How to Design Effective Prompts for Flux.1 Dev',
    content: 'Flux.1 Dev is an advanced development environment tailored for generating AI-driven images.',
    tagsList: ['Flux AI', 'Flux Pro AI', 'Flux.1 Dev', 'Flux Prompt'],
  },
];

export const imageConverterBlogMap: { [key: string]: BlogData[] } = {
  'webp-to-jpg': [
    {
      id: 'webp-to-jpg',
      title: 'Convert WebP to JPG | Benefits and Use Cases',
      content:
        'Learn how to convert WebP images to JPG and discover the advantages of using this format for different use cases.',
      tagsList: ['Flux AI', 'WebP to JPG', 'Image Conversion', 'Image Formats'],
    },
    {
      id: 'webp-to-jpg2',
      title: 'Convert WebP to JPG | Benefits and Use Cases',
      content:
        'Learn how to convert WebP images to JPG and discover the advantages of using this format for different use cases.',
      tagsList: ['Flux AI', 'WebP to JPG', 'Image Conversion', 'Image Formats'],
    },
  ],
  'webp-to-png': [
    {
      id: 'webp-to-png',
      title: 'Convert WebP to PNG | Benefits and Use Cases',
      content: 'Discover the benefits of converting WebP images to PNG and how to do it efficiently using Flux AI.',
      tagsList: ['Flux AI', 'WebP to PNG', 'Image Conversion', 'Image Formats'],
    },
    {
      id: 'webp-to-png2',
      title: 'Convert WebP to PNG | Benefits and Use Cases',
      content: 'Discover the benefits of converting WebP images to PNG and how to do it efficiently using Flux AI.',
      tagsList: ['Flux AI', 'WebP to PNG', 'Image Conversion', 'Image Formats'],
    },
  ],
  'jpg-to-webp': [
    {
      id: 'jpg-to-webp',
      title: 'Convert JPG to WebP | Why It Matters',
      content:
        'Optimize your JPG images by converting them to WebP, a format designed for efficiency and web performance.',
      tagsList: ['Flux AI', 'JPG to WebP', 'Image Optimization', 'WebP Format'],
    },
    {
      id: 'jpg-to-webp2',
      title: 'Convert JPG to WebP | Why It Matters',
      content:
        'Optimize your JPG images by converting them to WebP, a format designed for efficiency and web performance.',
      tagsList: ['Flux AI', 'JPG to WebP', 'Image Optimization', 'WebP Format'],
    },
  ],
  'jpg-to-png': [
    {
      id: 'jpg-to-png',
      title: 'Convert JPG to PNG | When and Why to Use PNG',
      content:
        'Understand the benefits of converting JPG to PNG and learn about situations where PNG offers better quality.',
      tagsList: ['Flux AI', 'JPG to PNG', 'Image Formats', 'Image Conversion'],
    },
    {
      id: 'jpg-to-png2',
      title: 'Convert JPG to PNG | When and Why to Use PNG',
      content:
        'Understand the benefits of converting JPG to PNG and learn about situations where PNG offers better quality.',
      tagsList: ['Flux AI', 'JPG to PNG', 'Image Formats', 'Image Conversion'],
    },
  ],
  'png-to-webp': [
    {
      id: 'png-to-webp',
      title: 'Convert PNG to WebP | Reducing File Size with WebP',
      content:
        'Learn how converting PNG images to WebP can reduce file sizes and improve performance without quality loss.',
      tagsList: ['Flux AI', 'PNG to WebP', 'File Size Optimization', 'Image Compression'],
    },
    {
      id: 'png-to-webp2',
      title: 'Convert PNG to WebP | Reducing File Size with WebP',
      content:
        'Learn how converting PNG images to WebP can reduce file sizes and improve performance without quality loss.',
      tagsList: ['Flux AI', 'PNG to WebP', 'File Size Optimization', 'Image Compression'],
    },
  ],
  'png-to-jpg': [
    {
      id: 'png-to-jpg',
      title: 'Convert PNG to JPG | Benefits and Use Cases',
      content: 'Convert PNG to JPG for more efficient storage, especially when lossless compression is not required.',
      tagsList: ['Flux AI', 'PNG to JPG', 'Image Compression', 'Image Formats'],
    },
    {
      id: 'png-to-jpg2',
      title: 'Convert PNG to JPG | Benefits and Use Cases',
      content: 'Convert PNG to JPG for more efficient storage, especially when lossless compression is not required.',
      tagsList: ['Flux AI', 'PNG to JPG', 'Image Compression', 'Image Formats'],
    },
  ],
};

export const modelBlogFlux1pro: BlogData[] = [
  {
    id: 'Best-Prompts-of-Flux1-AI-for-Flux-Images-—-February-25-2025-a74c6b0ce003',
    title: 'Best Prompts of Flux.1 AI for Flux Images — February 25, 2025',
    content: 'Explore top 6 best prompts for Black Forest Labs FLUX AI image model. February 25, 2025',
    tagsList: ['Flux AI', 'Flux 1.1 Pro', 'Flux Pro AI', 'Flux.1 AI'],
  },
  {
    id: 'Best-Prompts-of-Flux1-AI-for-Flux-Images-—-February-24-2025-000ca0a82d91',
    title: 'Best Prompts of Flux.1 AI for Flux Images — February 24, 2025',
    content: 'Explore top 6 best prompts for Black Forest Labs FLUX AI image model. February 24, 2025',
    tagsList: ['Flux AI', 'Flux 1.1 Pro', 'Flux AI Prompt', 'Flux Pro AI Prompt'],
  },
  {
    id: 'Experience-Flux-1-1-Pro-Ultra-for-Free%3A-A-Guide-to-Unleashing-Creative-Potential-e76d5e2d10de',
    title: 'Experience Flux 1.1 Pro Ultra for Free: A Guide to Unleashing Creative Potential',
    content:
      'Flux 1.1 Pro Ultra Free is an advanced AI image generator that excels in producing high-resolution outputs and rapid image creation.',
    tagsList: ['Flux AI', 'Flux 1.1 Pro', 'Flux 1.1 Pro Ultra', 'Flux 1.1 Pro Prompt'],
  },
  {
    id: 'Image-to-Prompt-Generator%3A-Unlocking-AI-Image-Creation-81ec4fc58db7',
    title: 'Image to Prompt Generator: Unlocking AI Image Creation',
    content:
      'Image to prompt generator is a revolutionary tool in the field of AI image creation, offering significant enhancements to the creative process',
    tagsList: ['Flux AI', 'Flux 1.1 Pro', 'Flux 1.1 Pro Prompt', 'Image to Prompt'],
  },
  {
    id: 'FLUX-1-Pro%3A-The-Ultimate-AI-Image-Generator-for-High-Quality-Visuals-0e6777cfc19d',
    title: 'FLUX.1 Pro: The Ultimate AI Image Generator for High-Quality Visuals',
    content:
      'Flux.1 Pro, developed by Black Forest Labs, this advanced AI image generation model delivers high-quality visuals.',
    tagsList: ['Flux.1 Pro', 'Flux.1 AI', 'AI Image Generation', 'Black Forest Labs'],
  },
  {
    id: 'Flux-1-1-Pro-Ultra-Now-Live-on-Flux-Pro-AI-f89c309e23db',
    title: 'Flux 1.1 Pro Ultra Now Live on Flux Pro AI',
    content: 'The Flux 1.1 Pro Ultra has officially launched on the Flux Pro AI platform as of November 11, 2024.',
    tagsList: ['Flux AI', 'Flux 1.1 Pro', 'Flux Pro AI', 'Flux 1.1 Pro Ultra'],
  },
  {
    id: 'Flux-Pro-AI%3A-Optimized-Flux-1-1-Pro-Online-Tool-Powered-by-fal-ai-80dadfdcf366',
    title: 'Flux Pro AI: Optimized Flux 1.1 Pro Online Tool Powered by fal.ai',
    content:
      'Flux 1.1 Pro, developed by Black Forest Labs, marks a significant advancement in AI-powered image generation.',
    tagsList: ['Flux AI', 'Flux 1.1 Pro', 'Flux Pro AI', 'fal ai'],
  },
  {
    id: 'Flux-Pro-AI%3A-Optimized-Flux-1-1-Pro-Online-Tool-Powered-by-fal-ai-80dadfdcf366',
    title: 'Flux Pro AI: Optimized Flux 1.1 Pro Online Tool Powered by fal.ai',
    content:
      'Flux 1.1 Pro, developed by Black Forest Labs, marks a significant advancement in AI-powered image generation.',
    tagsList: ['Flux AI', 'Flux 1.1 Pro', 'Flux Pro AI', 'fal ai'],
  },
];

export const modelBlogFlux1Dev: BlogData[] = [
  {
    id: 'Best-Prompts-of-Flux1-AI-for-Flux-Images-—-February-25-2025-a74c6b0ce003',
    title: 'Best Prompts of Flux.1 AI for Flux Images — February 25, 2025',
    content: 'Explore top 6 best prompts for Black Forest Labs FLUX AI image model. February 25, 2025',
    tagsList: ['Flux AI', 'Flux 1.1 Pro', 'Flux Pro AI', 'Flux.1 AI'],
  },
  {
    id: 'Best-Prompts-of-Flux1-AI-for-Flux-Images-—-February-24-2025-000ca0a82d91',
    title: 'Best Prompts of Flux.1 AI for Flux Images — February 24, 2025',
    content: 'Explore top 6 best prompts for Black Forest Labs FLUX AI image model. February 24, 2025',
    tagsList: ['Flux AI', 'Flux 1.1 Pro', 'Flux AI Prompt', 'Flux Pro AI Prompt'],
  },
  {
    id: '-How-to-Design-Effective-Prompts-for-Flux-1-Dev-12193866342d',
    title: 'How to Design Effective Prompts for Flux.1 Dev',
    content: 'Flux.1 Dev is an advanced development environment tailored for generating AI-driven images.',
    tagsList: ['Flux AI', 'Flux Pro AI', 'Flux.1 Dev', 'Flux Prompt'],
  },
  {
    id: 'Flux-Pro-AI%3A-Optimized-Flux-1-1-Pro-Online-Tool-Powered-by-fal-ai-80dadfdcf366',
    title: 'Flux Pro AI: Optimized Flux 1.1 Pro Online Tool Powered by fal.ai',
    content:
      'Flux 1.1 Pro, developed by Black Forest Labs, marks a significant advancement in AI-powered image generation.',
    tagsList: ['Flux AI', 'Flux 1.1 Pro', 'Flux Pro AI', 'fal ai'],
  },
  {
    id: 'How-to-Design-Prompts-for-Flux-1-1-Pro-0a16b61b16e6',
    title: 'How to Design Prompts for Flux 1.1 Pro',
    content:
      'Flux 1.1 Pro, developed by Black Forest Labs, is a cutting-edge AI model that transforms text prompts into high-quality images.',
    tagsList: ['Flux AI', 'Flux 1.1 Pro', 'Flux Pro AI', 'Flux Prompt'],
  },
  {
    id: '-How-to-Design-Effective-Prompts-for-Flux-1-Dev-12193866342d',
    title: 'How to Design Effective Prompts for Flux.1 Dev',
    content: 'Flux.1 Dev is an advanced development environment tailored for generating AI-driven images.',
    tagsList: ['Flux AI', 'Flux Pro AI', 'Flux.1 Dev', 'Flux Prompt'],
  },
];

export const modelBlogFlux11pro: BlogData[] = [
  {
    id: 'Best-Prompts-of-Flux1-AI-for-Flux-Images-—-February-25-2025-a74c6b0ce003',
    title: 'Best Prompts of Flux.1 AI for Flux Images — February 25, 2025',
    content: 'Explore top 6 best prompts for Black Forest Labs FLUX AI image model. February 25, 2025',
    tagsList: ['Flux AI', 'Flux 1.1 Pro', 'Flux Pro AI', 'Flux.1 AI'],
  },
  {
    id: 'Best-Prompts-of-Flux1-AI-for-Flux-Images-—-February-24-2025-000ca0a82d91',
    title: 'Best Prompts of Flux.1 AI for Flux Images — February 24, 2025',
    content: 'Explore top 6 best prompts for Black Forest Labs FLUX AI image model. February 24, 2025',
    tagsList: ['Flux AI', 'Flux 1.1 Pro', 'Flux AI Prompt', 'Flux Pro AI Prompt'],
  },
  {
    id: 'Experience-Flux-1-1-Pro-Ultra-for-Free%3A-A-Guide-to-Unleashing-Creative-Potential-e76d5e2d10de',
    title: 'Experience Flux 1.1 Pro Ultra for Free: A Guide to Unleashing Creative Potential',
    content:
      'Flux 1.1 Pro Ultra Free is an advanced AI image generator that excels in producing high-resolution outputs and rapid image creation.',
    tagsList: ['Flux AI', 'Flux 1.1 Pro', 'Flux 1.1 Pro Ultra', 'Flux 1.1 Pro Prompt'],
  },
  {
    id: 'Image-to-Prompt-Generator%3A-Unlocking-AI-Image-Creation-81ec4fc58db7',
    title: 'Image to Prompt Generator: Unlocking AI Image Creation',
    content:
      'Image to prompt generator is a revolutionary tool in the field of AI image creation, offering significant enhancements to the creative process',
    tagsList: ['Flux AI', 'Flux 1.1 Pro', 'Flux 1.1 Pro Prompt', 'Image to Prompt'],
  },
  {
    id: 'Flux-1-1-Pro-Ultra-Now-Live-on-Flux-Pro-AI-f89c309e23db',
    title: 'Flux 1.1 Pro Ultra Now Live on Flux Pro AI',
    content: 'The Flux 1.1 Pro Ultra has officially launched on the Flux Pro AI platform as of November 11, 2024.',
    tagsList: ['Flux AI', 'Flux 1.1 Pro', 'Flux Pro AI', 'Flux 1.1 Pro Ultra'],
  },
  {
    id: 'Flux-Pro-AI%3A-Optimized-Flux-1-1-Pro-Online-Tool-Powered-by-fal-ai-80dadfdcf366',
    title: 'Flux Pro AI: Optimized Flux 1.1 Pro Online Tool Powered by fal.ai',
    content:
      'Flux 1.1 Pro, developed by Black Forest Labs, marks a significant advancement in AI-powered image generation.',
    tagsList: ['Flux AI', 'Flux 1.1 Pro', 'Flux Pro AI', 'fal ai'],
  },
  {
    id: 'Flux-Pro-AI%3A-Optimized-Flux-1-1-Pro-Online-Tool-Powered-by-fal-ai-80dadfdcf366',
    title: 'Flux Pro AI: Optimized Flux 1.1 Pro Online Tool Powered by fal.ai',
    content:
      'Flux 1.1 Pro, developed by Black Forest Labs, marks a significant advancement in AI-powered image generation.',
    tagsList: ['Flux AI', 'Flux 1.1 Pro', 'Flux Pro AI', 'fal ai'],
  },
  {
    id: 'How-to-Design-Prompts-for-Flux-1-1-Pro-0a16b61b16e6',
    title: 'How to Design Prompts for Flux 1.1 Pro',
    content:
      'Flux 1.1 Pro, developed by Black Forest Labs, is a cutting-edge AI model that transforms text prompts into high-quality images.',
    tagsList: ['Flux AI', 'Flux 1.1 Pro', 'Flux Pro AI', 'Flux Prompt'],
  },
];

export const modelBlogFlux1Schnell: BlogData[] = [
  {
    id: 'Best-Prompts-of-Flux1-AI-for-Flux-Images-—-February-25-2025-a74c6b0ce003',
    title: 'Best Prompts of Flux.1 AI for Flux Images — February 25, 2025',
    content: 'Explore top 6 best prompts for Black Forest Labs FLUX AI image model. February 25, 2025',
    tagsList: ['Flux AI', 'Flux 1.1 Pro', 'Flux Pro AI', 'Flux.1 AI'],
  },
  {
    id: 'Best-Prompts-of-Flux1-AI-for-Flux-Images-—-February-24-2025-000ca0a82d91',
    title: 'Best Prompts of Flux.1 AI for Flux Images — February 24, 2025',
    content: 'Explore top 6 best prompts for Black Forest Labs FLUX AI image model. February 24, 2025',
    tagsList: ['Flux AI', 'Flux 1.1 Pro', 'Flux AI Prompt', 'Flux Pro AI Prompt'],
  },
  {
    id: 'FLUX-1-Schnell%3A-The-Advanced-Light-AI-Image-Generator-Model-edac727b7ba1',
    title: 'FLUX.1 Schnell: The Advanced Light AI Image Generator Model',
    content:
      'FLUX.1 Schnell is one of the innovative models in the FLUX AI image generation suite developed by Black Forest Labs.',
    tagsList: ['Flux.1 Schnell', 'Flux.1 AI', 'AI Image Generation', 'Black Forest Labs'],
  },
  {
    id: 'Flux-Pro-AI%3A-Optimized-Flux-1-1-Pro-Online-Tool-Powered-by-fal-ai-80dadfdcf366',
    title: 'Flux Pro AI: Optimized Flux 1.1 Pro Online Tool Powered by fal.ai',
    content:
      'Flux 1.1 Pro, developed by Black Forest Labs, marks a significant advancement in AI-powered image generation.',
    tagsList: ['Flux AI', 'Flux 1.1 Pro', 'Flux Pro AI', 'fal ai'],
  },
  {
    id: 'How-to-Design-Prompts-for-Flux-1-1-Pro-0a16b61b16e6',
    title: 'How to Design Prompts for Flux 1.1 Pro',
    content:
      'Flux 1.1 Pro, developed by Black Forest Labs, is a cutting-edge AI model that transforms text prompts into high-quality images.',
    tagsList: ['Flux AI', 'Flux 1.1 Pro', 'Flux Pro AI', 'Flux Prompt'],
  },
  {
    id: '-How-to-Design-Effective-Prompts-for-Flux-1-Dev-12193866342d',
    title: 'How to Design Effective Prompts for Flux.1 Dev',
    content: 'Flux.1 Dev is an advanced development environment tailored for generating AI-driven images.',
    tagsList: ['Flux AI', 'Flux Pro AI', 'Flux.1 Dev', 'Flux Prompt'],
  },
];

export const modelBlogFlux1ProUltra: BlogData[] = [
  {
    id: 'Best-Prompts-of-Flux1-AI-for-Flux-Images-—-February-25-2025-a74c6b0ce003',
    title: 'Best Prompts of Flux.1 AI for Flux Images — February 25, 2025',
    content: 'Explore top 6 best prompts for Black Forest Labs FLUX AI image model. February 25, 2025',
    tagsList: ['Flux AI', 'Flux 1.1 Pro', 'Flux Pro AI', 'Flux.1 AI'],
  },
  {
    id: 'Best-Prompts-of-Flux1-AI-for-Flux-Images-—-February-24-2025-000ca0a82d91',
    title: 'Best Prompts of Flux.1 AI for Flux Images — February 24, 2025',
    content: 'Explore top 6 best prompts for Black Forest Labs FLUX AI image model. February 24, 2025',
    tagsList: ['Flux AI', 'Flux 1.1 Pro', 'Flux AI Prompt', 'Flux Pro AI Prompt'],
  },
  {
    id: 'Experience-Flux-1-1-Pro-Ultra-for-Free%3A-A-Guide-to-Unleashing-Creative-Potential-e76d5e2d10de',
    title: 'Experience Flux 1.1 Pro Ultra for Free: A Guide to Unleashing Creative Potential',
    content:
      'Flux 1.1 Pro Ultra Free is an advanced AI image generator that excels in producing high-resolution outputs and rapid image creation.',
    tagsList: ['Flux AI', 'Flux 1.1 Pro', 'Flux 1.1 Pro Ultra', 'Flux 1.1 Pro Prompt'],
  },
  {
    id: 'Image-to-Prompt-Generator%3A-Unlocking-AI-Image-Creation-81ec4fc58db7',
    title: 'Image to Prompt Generator: Unlocking AI Image Creation',
    content:
      'Image to prompt generator is a revolutionary tool in the field of AI image creation, offering significant enhancements to the creative process',
    tagsList: ['Flux AI', 'Flux 1.1 Pro', 'Flux 1.1 Pro Ultra', 'Image to Prompt'],
  },
  {
    id: 'Flux-1-1-Pro-Ultra-Now-Live-on-Flux-Pro-AI-f89c309e23db',
    title: 'Flux 1.1 Pro Ultra Now Live on Flux Pro AI',
    content: 'The Flux 1.1 Pro Ultra has officially launched on the Flux Pro AI platform as of November 11, 2024.',
    tagsList: ['Flux AI', 'Flux 1.1 Pro', 'Flux Pro AI', 'Flux 1.1 Pro Ultra'],
  },
  {
    id: 'Flux-Pro-AI%3A-Optimized-Flux-1-1-Pro-Online-Tool-Powered-by-fal-ai-80dadfdcf366',
    title: 'Flux Pro AI: Optimized Flux 1.1 Pro Online Tool Powered by fal.ai',
    content:
      'Flux 1.1 Pro, developed by Black Forest Labs, marks a significant advancement in AI-powered image generation.',
    tagsList: ['Flux AI', 'Flux 1.1 Pro', 'Flux Pro AI', 'fal ai'],
  },
  {
    id: 'Flux-Pro-AI%3A-Optimized-Flux-1-1-Pro-Online-Tool-Powered-by-fal-ai-80dadfdcf366',
    title: 'Flux Pro AI: Optimized Flux 1.1 Pro Online Tool Powered by fal.ai',
    content:
      'Flux 1.1 Pro, developed by Black Forest Labs, marks a significant advancement in AI-powered image generation.',
    tagsList: ['Flux AI', 'Flux 1.1 Pro', 'Flux Pro AI', 'fal ai'],
  },
  {
    id: 'How-to-Design-Prompts-for-Flux-1-1-Pro-0a16b61b16e6',
    title: 'How to Design Prompts for Flux 1.1 Pro',
    content:
      'Flux 1.1 Pro, developed by Black Forest Labs, is a cutting-edge AI model that transforms text prompts into high-quality images.',
    tagsList: ['Flux AI', 'Flux 1.1 Pro', 'Flux Pro AI', 'Flux Prompt'],
  },
];

export const modelBlogFluxProKontext: BlogData[] = [];
export const modelBlogFluxMaxKontext: BlogData[] = [];

export const imageUpscalerBlogData: BlogData[] = [
  {
    id: 'Best-Prompts-of-Flux1-AI-for-Flux-Images-—-February-25-2025-a74c6b0ce003',
    title: 'Best Prompts of Flux.1 AI for Flux Images — February 25, 2025',
    content: 'Explore top 6 best prompts for Black Forest Labs FLUX AI image model. February 25, 2025',
    tagsList: ['Flux AI', 'Flux 1.1 Pro', 'Flux Pro AI', 'Flux.1 AI'],
  },
  {
    id: 'Best-Prompts-of-Flux1-AI-for-Flux-Images-—-February-24-2025-000ca0a82d91',
    title: 'Best Prompts of Flux.1 AI for Flux Images — February 24, 2025',
    content: 'Explore top 6 best prompts for Black Forest Labs FLUX AI image model. February 24, 2025',
    tagsList: ['Flux AI', 'Flux 1.1 Pro', 'Flux AI Prompt', 'Flux Pro AI Prompt'],
  },
];

export const photoMakerBlogData: BlogData[] = [];

export const modelBlogCannyDepth: BlogData[] = [
  {
    id: 'Best-Prompts-of-Flux1-AI-for-Flux-Images-—-February-25-2025-a74c6b0ce003',
    title: 'Best Prompts of Flux.1 AI for Flux Images — February 25, 2025',
    content: 'Explore top 6 best prompts for Black Forest Labs FLUX AI image model. February 25, 2025',
    tagsList: ['Flux AI', 'Flux 1.1 Pro', 'Flux Pro AI', 'Flux.1 AI'],
  },
  {
    id: 'Best-Prompts-of-Flux1-AI-for-Flux-Images-—-February-24-2025-000ca0a82d91',
    title: 'Best Prompts of Flux.1 AI for Flux Images — February 24, 2025',
    content: 'Explore top 6 best prompts for Black Forest Labs FLUX AI image model. February 24, 2025',
    tagsList: ['Flux AI', 'Flux 1.1 Pro', 'Flux AI Prompt', 'Flux Pro AI Prompt'],
  },
];
export const modelBlogFluxFill: BlogData[] = [
  {
    id: 'Best-Prompts-of-Flux1-AI-for-Flux-Images-—-February-25-2025-a74c6b0ce003',
    title: 'Best Prompts of Flux.1 AI for Flux Images — February 25, 2025',
    content: 'Explore top 6 best prompts for Black Forest Labs FLUX AI image model. February 25, 2025',
    tagsList: ['Flux AI', 'Flux 1.1 Pro', 'Flux Pro AI', 'Flux.1 AI'],
  },
  {
    id: 'Best-Prompts-of-Flux1-AI-for-Flux-Images-—-February-24-2025-000ca0a82d91',
    title: 'Best Prompts of Flux.1 AI for Flux Images — February 24, 2025',
    content: 'Explore top 6 best prompts for Black Forest Labs FLUX AI image model. February 24, 2025',
    tagsList: ['Flux AI', 'Flux 1.1 Pro', 'Flux AI Prompt', 'Flux Pro AI Prompt'],
  },
];
export const modelBlogRedux: BlogData[] = [
  {
    id: 'Best-Prompts-of-Flux1-AI-for-Flux-Images-—-February-25-2025-a74c6b0ce003',
    title: 'Best Prompts of Flux.1 AI for Flux Images — February 25, 2025',
    content: 'Explore top 6 best prompts for Black Forest Labs FLUX AI image model. February 25, 2025',
    tagsList: ['Flux AI', 'Flux 1.1 Pro', 'Flux Pro AI', 'Flux.1 AI'],
  },
  {
    id: 'Best-Prompts-of-Flux1-AI-for-Flux-Images-—-February-24-2025-000ca0a82d91',
    title: 'Best Prompts of Flux.1 AI for Flux Images — February 24, 2025',
    content: 'Explore top 6 best prompts for Black Forest Labs FLUX AI image model. February 24, 2025',
    tagsList: ['Flux AI', 'Flux 1.1 Pro', 'Flux AI Prompt', 'Flux Pro AI Prompt'],
  },
];
export const photoToVideoBlogData: BlogData[] = [];
export const aiKissVideoBlogData: BlogData[] = [];
export const aiHugVideoBlogData: BlogData[] = [];
export const fluxAIPromptGeneratorBlogData: BlogData[] = [
  {
    id: 'Best-Prompts-of-Flux1-AI-for-Flux-Images-—-February-25-2025-a74c6b0ce003',
    title: 'Best Prompts of Flux.1 AI for Flux Images — February 25, 2025',
    content: 'Explore top 6 best prompts for Black Forest Labs FLUX AI image model. February 25, 2025',
    tagsList: ['Flux AI', 'Flux 1.1 Pro', 'Flux Pro AI', 'Flux.1 AI'],
  },
  {
    id: 'Best-Prompts-of-Flux1-AI-for-Flux-Images-—-February-24-2025-000ca0a82d91',
    title: 'Best Prompts of Flux.1 AI for Flux Images — February 24, 2025',
    content: 'Explore top 6 best prompts for Black Forest Labs FLUX AI image model. February 24, 2025',
    tagsList: ['Flux AI', 'Flux 1.1 Pro', 'Flux AI Prompt', 'Flux Pro AI Prompt'],
  },
];
export const videoGeneratorBlogData: BlogData[] = [];
export const newYearAvatarBlogData: BlogData[] = [];
export const newYearCoverBlogData: BlogData[] = [];
export const modelBlogRecraftAI: BlogData[] = [];
export const aiAvatarGeneratorBlogData: BlogData[] = [];
export const aiRemoveBackgroundBlogData: BlogData[] = [];
export const imageToImageBlogData: BlogData[] = [];
export const wanAiVideoBlogData: BlogData[] = [];

export function LinkItem({
  title,
  content,
  href,
  tagsList,
}: {
  title: string;
  content: string;
  href: string;
  tagsList?: string[] | string;
}) {
  const hasTags = tagsList && tagsList?.length > 0;

  return (
    <div className='w-full'>
      <Link href={href}>
        <div
          className={cn(
            'flex h-[100px] w-full justify-between gap-4 rounded-t-xl border border-main-gray bg-card-black p-2 hover:opacity-70',
            !hasTags && 'rounded-b-xl',
          )}
        >
          <div className='flex flex-col gap-1.5'>
            <h3 className='line-clamp-1 text-lg font-semibold'>{title}</h3>
            <p className='line-clamp-2 text-sm text-white/70'>{content}</p>
          </div>
          <div className='mt-auto shrink-0'>
            <ArrowUpRight className='size-4' />
          </div>
        </div>
      </Link>
      <ul
        className={cn(
          'no-scrollbar flex items-center gap-2 overflow-x-auto rounded-b-xl border border-t-0 border-main-gray bg-black p-2',
          !hasTags ? 'hidden' : '',
        )}
      >
        {Array.isArray(tagsList)
          ? tagsList?.map((tag) => (
              <li
                key={tag}
                className='flex shrink-0 items-center gap-1 rounded-lg border border-main-gray px-2 py-1 text-xs text-white/70'
              >
                <MapPin className='size-3' />
                {tag}
              </li>
            ))
          : tagsList?.split(',').map((tag) => (
              <li
                key={tag}
                className='flex shrink-0 items-center gap-1 rounded-lg border border-main-gray px-2 py-1 text-xs text-white/70'
              >
                <MapPin className='size-3' />
                {tag}
              </li>
            ))}
      </ul>
    </div>
  );
}

export default function RecommendSection({ blogData, title }: { blogData: BlogData[]; title: string }) {
  return (
    <div className='mx-auto flex w-full max-w-pc flex-col items-center gap-4 px-2 lg:px-0'>
      <h2 className='text-xl font-semibold lg:text-2xl'>{title}</h2>
      <div className='grid grid-cols-1 gap-2 lg:w-auto lg:grid-cols-2 lg:flex-row'>
        {blogData.map((el) => (
          <LinkItem
            key={el.id}
            href={`/blog/detail/${el.id}`}
            title={el.title}
            content={el.content}
            tagsList={el.tagsList}
          />
        ))}
      </div>
    </div>
  );
}

export function RecommendSectionContainer({
  code,
  blogData,
  title,
}: {
  code: string;
  blogData: BlogData[];
  title?: string;
}) {
  const t = useTranslations(code);
  return <RecommendSection blogData={blogData} title={title || t('RecommendSection.title')} />;
}
