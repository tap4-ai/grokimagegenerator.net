import { cn } from '@/lib/utils';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';

export default function Faq({
  title,
  faqList,
  className,
}: {
  title: string;
  faqList: { question: string; answer: string }[];
  className?: string;
}) {
  return (
    <section className={cn('container-centered container-py space-y-8', className)}>
      <h2 className='text-center text-2xl font-bold lg:pb-3 lg:text-3xl'>{title}</h2>
      <Accordion type='single' collapsible className='grid w-full grid-cols-1 gap-3 px-3 lg:grid-cols-2 lg:px-0'>
        {faqList.map((item, index) => (
          <AccordionItem key={index} value={item.question} className='w-full space-y-3 border-b-0'>
            <AccordionTrigger className='rounded-xl border border-main-gray bg-black p-5 text-left text-base font-semibold hover:no-underline lg:text-lg'>
              {item.question}
            </AccordionTrigger>
            <AccordionContent className='whitespace-pre-line rounded-xl border border-main-gray bg-black p-5 text-base text-white/70'>
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
