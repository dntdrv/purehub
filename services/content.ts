import { TopicNode, ShieldGuide } from '../types';

export const TOPICS: Record<string, TopicNode> = {
  'root': {
    id: 'root',
    title: 'The Path',
    category: 'strategy',
    summary: 'Your map to recovery. Choose a path.',
    content: 'Welcome to the Recovery Map. This is not a linear journey. Explore the neuroscience to understand the "Why", or jump to strategies for the "How".',
    childrenIds: ['science_root', 'strategy_root', 'philosophy_root'],
    relatedIds: []
  },
  
  // --- SCIENCE BRANCH ---
  'science_root': {
    id: 'science_root',
    title: 'Neuroscience',
    category: 'science',
    summary: 'The mechanics of addiction.',
    content: '# Your Brain on Porn\n\nAddiction is a mechanical issue in the brain involving dopamine, DeltaFosB, and frontal cortex hypoactivity. It is not a moral failing.',
    childrenIds: ['dopamine', 'deltafosb', 'hypofrontality'],
    relatedIds: ['strategy_root']
  },
  'dopamine': {
    id: 'dopamine',
    title: 'Dopamine Cycle',
    category: 'science',
    summary: 'The molecule of craving.',
    content: '### The Motivation Molecule\n\nDopamine drives you to seek rewards. High-speed internet porn floods the brain with unnatural levels of dopamine, causing receptors to "burn out" (downregulate).',
    childrenIds: ['desensitization'],
    relatedIds: ['anhedonia']
  },
  'desensitization': {
    id: 'desensitization',
    title: 'Desensitization',
    category: 'science',
    summary: 'Why you need "more".',
    content: 'As receptors die off to protect the brain, you need more extreme stimulus to feel "normal". This leads to escalation into genres you may not even like.',
    childrenIds: [],
    relatedIds: ['dopamine']
  },
  'deltafosb': {
    id: 'deltafosb',
    title: 'DeltaFosB',
    category: 'science',
    summary: 'The neural switch.',
    content: 'DeltaFosB is a protein that builds up in the brain with chronic use. It physically changes neural pathways, making the addiction the top priority. It takes weeks to fade.',
    childrenIds: [],
    relatedIds: ['withdrawal']
  },
  'hypofrontality': {
    id: 'hypofrontality',
    title: 'Hypofrontality',
    category: 'science',
    summary: 'Erosion of Willpower.',
    content: 'Addiction reduces blood flow to the Prefrontal Cortex (your decision maker). You literally lose the capacity to say "no". Recovery restores this.',
    childrenIds: [],
    relatedIds: []
  },

  // --- STRATEGY BRANCH ---
  'strategy_root': {
    id: 'strategy_root',
    title: 'Strategy',
    category: 'strategy',
    summary: 'Tactics for victory.',
    content: '# Protocols\n\nHope is not a strategy. You need systems. Design your life so you don\'t need willpower.',
    childrenIds: ['environment', 'urge_surfing', 'transmutation'],
    relatedIds: ['science_root']
  },
  'environment': {
    id: 'environment',
    title: 'Environment',
    category: 'strategy',
    summary: 'Friction is your friend.',
    content: 'Make the bad habit impossible or annoying. \n\n* Charge phone in the kitchen.\n* Use grayscale mode.\n* Keep bedroom door open.',
    childrenIds: [],
    relatedIds: []
  },
  'urge_surfing': {
    id: 'urge_surfing',
    title: 'Urge Surfing',
    category: 'strategy',
    summary: 'Ride the wave.',
    content: 'Urges are like waves. They crest and break in ~20 mins. Don\'t fight it. Observe it. "I am feeling an urge." Wait for it to pass.',
    childrenIds: [],
    relatedIds: ['mindfulness']
  },
  'transmutation': {
    id: 'transmutation',
    title: 'Transmutation',
    category: 'strategy',
    summary: 'Use the energy.',
    content: 'Sexual energy is creative fuel. Do not suppress it; redirect it immediately into exercise, work, or creation.',
    childrenIds: [],
    relatedIds: []
  },

  // --- PHILOSOPHY BRANCH ---
  'philosophy_root': {
    id: 'philosophy_root',
    title: 'Philosophy',
    category: 'philosophy',
    summary: 'Mindset & Meaning.',
    content: '# The Stoic Way\n\n"You have power over your mind - not outside events." - Marcus Aurelius.',
    childrenIds: ['stoicism', 'identity'],
    relatedIds: ['strategy_root']
  },
  'stoicism': {
    id: 'stoicism',
    title: 'Stoic Discipline',
    category: 'philosophy',
    summary: 'Control what you can.',
    content: 'You cannot control the thought popping up. You CAN control if you entertain it.',
    childrenIds: [],
    relatedIds: []
  },
  'identity': {
    id: 'identity',
    title: 'Identity Shift',
    category: 'philosophy',
    summary: 'Who are you?',
    content: 'Stop trying to "quit". Start BEING a person who doesn\'t watch porn. Shift from "I can\'t" to "I don\'t".',
    childrenIds: [],
    relatedIds: []
  },
};

export const SHIELD_GUIDES: ShieldGuide[] = [
  {
    id: 'android',
    platform: 'Android',
    iconName: 'android',
    difficulty: 'Easy',
    steps: [
      { title: 'Open Settings', description: 'Go to Settings > Digital Wellbeing & parental controls.' },
      { title: 'Set Up Parental Controls', description: 'Tap "Set up parental controls". Yes, do this for yourself. Choose "Get started" then "Child or teen".' },
      { title: 'Link Account', description: 'You will need a secondary Google account to act as the "Parent". Link it.' },
      { title: 'Chrome Filters', description: 'In the controls, select Chrome > "Try to block explicit sites". This enforces SafeSearch at the browser level.' },
      { title: 'App Limits', description: 'Set daily timers to 0 minutes for problematic apps to lock them out completely.' }
    ],
    warning: "Requires a second Google account (friend/partner) to be effective."
  },
  {
    id: 'ios',
    platform: 'iOS (iPhone)',
    iconName: 'apple',
    difficulty: 'Medium',
    steps: [
      { title: 'Screen Time', description: 'Go to Settings > Screen Time. Turn it on.' },
      { title: 'Content Restrictions', description: 'Tap "Content & Privacy Restrictions". Toggle it ON.' },
      { title: 'Web Content', description: 'Tap "Content Restrictions" > "Web Content". Select "Limit Adult Websites".' },
      { title: 'Disallow Apps', description: 'Go back to "iTunes & App Store Purchases". Set "Installing Apps" to "Don\'t Allow" to prevent downloading new browsers.' },
      { title: 'Lock It', description: 'Go back to main Screen Time menu. Tap "Use Screen Time Passcode". Have a friend set this for you.' }
    ]
  },
  {
    id: 'mac',
    platform: 'MacOS',
    iconName: 'monitor',
    difficulty: 'Easy',
    steps: [
      { title: 'System Settings', description: 'Open System Settings > Screen Time.' },
      { title: 'Content & Privacy', description: 'Click "Content & Privacy". Turn it on.' },
      { title: 'Store Restrictions', description: 'In "Store Restrictions", set "Explicit Content" to disallowed.' },
      { title: 'Web Content', description: 'In "Web Content Access", select "Limit Adult Websites".' }
    ]
  },
  {
    id: 'windows',
    platform: 'Windows',
    iconName: 'windows',
    difficulty: 'Hard',
    steps: [
      { title: 'Create Family Group', description: 'Go to account.microsoft.com/family. Create a family group.' },
      { title: 'Add Member', description: 'Add a new "Child" account. This will be your main login.' },
      { title: 'Content Filters', description: 'Click "Content filters" > "Web and search". Turn on "Filter inappropriate websites".' },
      { title: 'Apps', description: 'Go to "Apps and games". Block specific browsers that bypass filters.' }
    ],
    warning: "The 'Child' account method is the only native way to enforce blocks on Windows."
  }
];

export const PANIC_QUOTES = [
  "The pain of discipline is far less than the pain of regret.",
  "You are not your urges. You are the observer of them.",
  "Don't trade what you want most for what you want now.",
  "This feeling is temporary. Glory is forever.",
  "Breathe. You have beaten 100% of your bad days so far."
];