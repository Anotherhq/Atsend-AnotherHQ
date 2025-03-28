import React from 'react'
import { MoveRight } from 'lucide-react'

interface OnboardingStep {
  id: number;
  title: string;
  description: string;
  buttonText: string;
}

const ONBOARDING_STEPS: OnboardingStep[] = [
  {
    id: 1,
    title: 'Create a landing page',
    description: 'Collect emails from your audience easily with a professional-looking landing page you can set up in minutes.',
    buttonText: 'Create a landing page'
  },
  {
    id: 2,
    title: 'Set Your Welcome Email',
    description: 'Make a great first impression! Send a personalized welcome email to greet new subscribers.',
    buttonText: 'Create a sequence'
  },
  {
    id: 3,
    title: 'Send Your First Newsletter',
    description: 'Stay connected with your audience by sending engaging newsletters in just a few clicks.',
    buttonText: 'Create Newsletter'
  }
]

const OnboardingStepCard: React.FC<{ step: OnboardingStep }> = ({ step }) => (
  <div className="h-[90%] w-[30%]">
    <div className="w-full h-full">
      <div className="w-full h-full border border-zinc-800 rounded-lg flex flex-col items-start justify-evenly px-5">
        <div className="text-lg tracking-wider font-normal flex items-center gap-2 w-full justify-between">
          <p>{step.title}</p>

            <span className='bg-zinc-300 text-[#171717] w-5 h-5 text-sm px-1 rounded-full flex items-center justify-center'>
              <p className='text-sm select-none'>{step.id}</p>
            </span>
          
        </div>
        <p className="text-sm tracking-wider font-normal text-zinc-500">
          {step.description}
        </p>
        <button 
          className='w-fit px-3 h-8 rounded-lg cursor-pointer text-zinc-300 text-sm tracking-wide antialiased border border-zinc-800 bg-[#1f1f1f] flex items-center justify-center'
        >
          {step.buttonText}
        </button>
      </div>
    </div>
  </div>
)

const Onboarding: React.FC = () => {
  return (
    <div className='h-[40%] w-full flex items-center justify-center px-10 py-5 text-zinc-400'>
      <div className="bg-[#171717] w-full rounded-lg h-full px-10 py-5 gap-5 flex flex-col items-start justify-between">
        <p className="text-sm text-zinc-500 tracking-wider">Get started with Atsend</p>
        <h1 className="text-lg tracking-wider font-semibold">Onboarding</h1>
        
        <div className="h-full w-full flex items-center justify-between">
          {ONBOARDING_STEPS.map((step, index) => (
            <React.Fragment key={step.id}>
              <OnboardingStepCard step={step} />
              
              {index < ONBOARDING_STEPS.length - 1 && (
                <div className="">
                  <MoveRight color='gray' />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Onboarding