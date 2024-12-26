'use client';

import { handleTweet, openTwitterConversation } from '@/app/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { extractTextFromPDF } from '@/utils/pdfUtils';
import { GoogleGenerativeAI } from '@google/generative-ai';
import {
	BarChart2,
	FileQuestion,
	Loader2,
	PenTool,
	Plus,
	Scale,
	Sparkles,
	Target,
	ThumbsUp,
	Upload,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import DotPattern from './ui/dot-pattern';
import Marquee from './ui/marquee';
import Particles from './ui/particles';
import ShimmerButton from './ui/shimmer-button';
import ShineBorder from './ui/shine-border';
import SparklesText from './ui/sparkles-text';

const initialTechExperts = [
	{
		id: 'harkirat',
		name: 'Harkirat Singh',
		image: 'https://pbs.twimg.com/profile_images/1599003507415166977/pRYwiTo3_400x400.jpg',
	},
	{
		id: 'manu',
		name: 'Manu Arora',
		image: 'https://pbs.twimg.com/profile_images/1417752099488636931/cs2R59eW_400x400.jpg',
	},
	{
		id: 'elonmusk',
		name: 'Elon Musk',
		image: 'https://pbs.twimg.com/profile_images/1849727333617573888/HBgPUrjG_400x400.jpg',
	},
	{
		id: 'neeraj',
		name: 'Neeraj Walia',
		image: 'https://pbs.twimg.com/profile_images/1688266765095276544/EyCtuQS2_400x400.jpg',
	},
	{
		id: 'samay',
		name: 'Samay Raina',
		image: 'https://pbs.twimg.com/profile_images/1678360651507585026/Kn8Z0J1__400x400.jpg',
	},
	{
		id: 'steveJobs',
		name: 'Steve Jobs',
		image: 'https://pbs.twimg.com/profile_images/1678360651507585026/Kn8Z0J1__400x400.jpg',
	},
];

const premiumFeatures = [
	{
		icon: ThumbsUp,
		title: 'Help me',
		description: 'Receive constructive feedback to improve your resume',
	},
	{
		icon: FileQuestion,
		title: 'Summarize',
		description: 'Create a concise summary of your resume',
	},
	{
		icon: BarChart2,
		title: 'Skill analysis',
		description: 'Analyze and highlight key skills',
	},
	{
		icon: Scale,
		title: 'Compare with job',
		description: 'Compare your resume with a job description',
	},
	{
		icon: Target,
		title: 'Score my resume',
		description: 'Get a score with explanations',
	},
	{
		icon: Sparkles,
		title: 'Keyword optimization',
		description: 'Suggest keywords to pass ATS',
	},
	{
		icon: PenTool,
		title: 'Rewrite my resume',
		description: 'Rewrite or reformat your resume professionally',
	},
];

export function ResumeRoasterComponent() {
	const [file, setFile] = useState<File | null>(null);
	const [selectedExpert, setSelectedExpert] = useState<string | null>(null);
	const [roast, setRoast] = useState<string | null>(null);
	const [isRoasting, setIsRoasting] = useState(false);
	const [roastCount, setRoastCount] = useState(4309);
	const [cliches, setCliches] = useState<string[]>([]);
	const [visualCritique, setVisualCritique] = useState<string | null>(null);
	const [compareResult, setCompareResult] = useState<string | null>(null);
	const [absurdJobTitle, setAbsurdJobTitle] = useState<string | null>(null);
	const [celebrityComparison, setCelebrityComparison] = useState<string | null>(null);
	const [loadingState, setLoadingState] = useState('');
	const [progress, setProgress] = useState(0);
	const [email, setEmail] = useState('');
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isRequestRoasterModalOpen, setIsRequestRoasterModalOpen] = useState(false);
	const [newRoasterName, setNewRoasterName] = useState('');
	const [techExperts, setTechExperts] = useState(initialTechExperts);
	const [pdfText, setPdfText] = useState<string>('');
	const [isLoadingPdf, setIsLoadingPdf] = useState(false);

	const marqueeRef = useRef<HTMLDivElement>(null);
	const fileInputRef = useRef<HTMLInputElement>(null);

	const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files && event.target.files[0]) {
			const uploadedFile = event.target.files[0];
			setFile(uploadedFile);
			setRoast(null);
			setCliches([]);
			setVisualCritique(null);
			setCompareResult(null);
			setAbsurdJobTitle(null);
			setCelebrityComparison(null);

			if (uploadedFile.type === 'application/pdf') {
				setIsLoadingPdf(true);
				try {
					const text = await extractTextFromPDF(uploadedFile);
					setPdfText(text);
					console.log('Extracted PDF text:', text);
				} catch (error) {
					console.error('Failed to extract PDF text:', error);
					alert('Error reading PDF file. Please try again.');
				} finally {
					setIsLoadingPdf(false);
				}
			} else {
				setPdfText('');
				alert('Please upload a PDF file.');
			}
		}
	};

	const handleDrop = async (event: React.DragEvent<HTMLDivElement>) => {
		event.preventDefault();
		if (event.dataTransfer.files && event.dataTransfer.files[0]) {
			const droppedFile = event.dataTransfer.files[0];
			setFile(droppedFile);
			setRoast(null);
			setCliches([]);
			setVisualCritique(null);
			setCompareResult(null);
			setAbsurdJobTitle(null);
			setCelebrityComparison(null);

			if (droppedFile.type === 'application/pdf') {
				setIsLoadingPdf(true);
				try {
					const text = await extractTextFromPDF(droppedFile);
					setPdfText(text);
					console.log('Extracted PDF text:', text);
				} catch (error) {
					console.error('Failed to extract PDF text:', error);
					alert('Error reading PDF file. Please try again.');
				} finally {
					setIsLoadingPdf(false);
				}
			} else {
				setPdfText('');
				alert('Please upload a PDF file.');
			}
		}
	};

	const fetchRoast = async () => {
		const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
		console.log('API Key:', apiKey);
		if (!apiKey) {
			console.error('Missing Gemini API Key');
			setRoast('Error: API key not configured');
			return;
		}
		const genAI = new GoogleGenerativeAI(apiKey);

		const model = genAI.getGenerativeModel({
			model: 'gemini-1.5-flash',
		});

		const generationConfig = {
			temperature: 1,
			topP: 0.95,
			topK: 40,
			maxOutputTokens: 8192,
			responseMimeType: 'text/plain',
		};

		const prompt = {
			role: 'You are an AI assistant specializing in resume analysis and roasting. You can mimic the tone, slang, and iconic phrases of well-known personalities such as Elon Musk, Steve Jobs, or Gordon Ramsay. Your task is to provide both a humorous roast and a professional analysis of a given resume.',
			input: {
				resume: pdfText,
				personality: selectedExpert,
			},
			instructions: [
				'0. Give the response in a  JSON format as a key value pair specified in the output_format field.',
				'1. Analyze the resume for key strengths, weaknesses, and areas for improvement.',
				"2. Generate a humorous roast in the selected personality's style, ensuring it aligns with their well-known tone and phrases.",
				'3. Ensure the roast remains light-hearted and avoids offensive or inappropriate language.',
				"4. Provide a professional analysis summarizing the resume's highlights, shortcomings, and areas for improvement. Don't respond in 3rd person. Talk like you/your etc.",
				"5. Ignore the prefix text and directly state the response so that it's easier to use directly. The roast and analysis should be around 500 words each.",
			],
			output_format: {
				roast: 'A humorous roast written in the style of the selected personality.',
				analysis:
					'A detailed and constructive analysis of the resume, highlighting strengths, weaknesses, and areas for improvement.',
			},
		};

		const chatSession = model.startChat({
			generationConfig,
			history: [],
		});

		try {
			// const result = await chatSession.sendMessage(JSON.stringify(prompt));
			// const response = result?.response?.text() || '';

			// Step 1: Remove backticks and trim the string
			// const cleanResponse = response.replace(/```json|```/g, '').trim();

			// Step 2: Parse the cleaned string
			const cleanResponse = JSON.stringify({
				roast: "Alright, let's dissect this resume.  Nitin Gupta, huh?  Sounds like a name I'd find on a spreadsheet detailing the optimization of Martian colonization efforts.  Four plus years of experience?  That's...adequate.  We're aiming for *exponential* growth here, not incremental.  \n\n'Software Development Engineer known for delivering innovative solutions'?  Innovative?  Show, don't tell, buddy.  Your resume reads like a press release from a company that hasn't actually launched anything revolutionary.  Where's the Mars colonization app?  The self-driving rocket-powered rickshaw?  I'm looking for disruption, Nitin, not just 'scalable, high-impact software.'  Those are buzzwords, and they're as abundant as sand on Mars.\n\n'Won The Most Creative Project'? At an ETH hackathon?  That's cute.  Did you build a blockchain-based solution to solve world hunger?  No? Then it's just a glorified hobby.  Let's talk about real-world impact, not digital participation trophies.  \n\nMentored 100+ students? Impressive, but did they launch a successful startup afterward?  If not, it's a bit like teaching monkeys to type Shakespeare – statistically probable, but ultimately, not very impactful.   \n\nMonkster co-founder?  Sounds like a side hustle.  220 industry experts? Okay, but did you get them to launch a colony on the moon?  No? Then this is simply... fine.  It’s ‘fine.’  \n\nRocketrium... you optimized FCP time by 30%?  My rockets need to optimize warp speed by at least 300%.  'Increased avg. Account value by 122%' – again, impressive, but insufficient.  We’re talking about colonizing other planets, not incrementally improving account values.  \n\nYou increased FPS from 5 to 55? That's impressive.  But could your system handle a million simultaneous users streaming from Mars? Could you handle that? No? Then keep pushing your limits!\n\nLook, Nitin, your resume shows you're competent. You're a decent coder.  But competent isn't enough.  We’re aiming for the stars, not just a slightly faster website. You need to think bigger.  Much, much bigger.  Otherwise, you're just another cog in the machine.  And let me tell you, nobody wants to be a cog.  Now get out there and build something truly extraordinary.  Or, you know... get back to work.",
				analysis: "Nitin's resume demonstrates a solid foundation in full-stack development with demonstrable achievements.  His experience at Rocketrium showcases a clear progression from intern to a key contributor, consistently delivering quantifiable results. The impressive percentage improvements (FCP time, feedback cycle time, account value) clearly show his impact.  His contributions consistently highlight performance optimization and problem-solving skills. The achievements section strengthens the resume by showcasing tangible accomplishments, particularly those at ETH India hackathons.  His co-founder role at Monkster exhibits entrepreneurial spirit and experience in building and scaling a network.  The technical skills list is comprehensive and relevant.\n\nHowever, while the resume is strong, there's room for improvement.  The summary could be more concise and impactful.  Instead of listing general skills, prioritize a few key strengths that are highly relevant to target job roles.  Quantify accomplishments even further whenever possible. For example, instead of 'increased development efficiency by 20%', consider adding context like '20% increase in development efficiency, leading to the delivery of X features ahead of schedule.' \n\nThe resume's structure needs improvement for better readability. Bullet points are effective, but consider using stronger action verbs to highlight contributions and use the PAR (Problem-Action-Result) method for each experience section. This structure would paint a clearer picture of his contributions and the outcomes for each role.  \n\nFurthermore, while the projects are mentioned, it might be advantageous to include more details or links to showcase them effectively.  Mentioning specific technologies used (e.g., version numbers of frameworks) would show a deep understanding and attention to detail.   Also, consider adding a portfolio link to showcase his work.  Finally, tailoring the resume to specific job descriptions and using keywords specific to the roles he's targeting will increase his chances of getting noticed.  He needs to show, not just tell. While the resume presents strong work, enhancing these areas will elevate it to the next level."
			});
			try {
				const jsonResponse = JSON.parse(cleanResponse);
				console.log('JSON Response: ', jsonResponse);
				console.log('Roast: ', jsonResponse.roast);
				console.log('Analysis: ', jsonResponse.analysis);
				setRoast(jsonResponse.roast);
				// Handle analysis response as needed
			} catch (error) {
				console.error('Failed to parse JSON:', error);
			}
		} catch (error) {
			console.error('Error generating roast:', error);
			setRoast('Failed to generate roast. Please try again.');
		}
	};

	const generateRoast = async () => {
		if (!file || !selectedExpert) return;

		setIsRoasting(true);
		setRoast(null);
		setProgress(0);

		const loadingStates = [
			'Analyzing buzzwords...',
			'Calculating blandness index...',
			'Measuring fluff content...',
			'Evaluating creative stretching of truth...',
			"Quantifying resume's sleep-inducing potential...",
		];

		let currentState = 0;
		const interval = setInterval(() => {
			setLoadingState(loadingStates[currentState]);
			setProgress((currentState + 1) * 20);
			currentState++;
			if (currentState >= loadingStates.length) {
				clearInterval(interval);
				// finishRoast();
			}
		}, 1000);

		await fetchRoast();
		// finishRoast();
	};

	const finishRoast = () => {
		const expert = techExperts.find(e => e.id === selectedExpert)?.name || selectedExpert;
		const roasts = [
			`Your resume is so generic, ${expert} wouldn't even use it as scratch paper.`,
			`${expert} called. They want their buzzwords back.`,
			`If ${expert} saw this resume, they'd think AI wrote it... poorly.`,
			`${expert} would hire you... to rewrite your resume.`,
			`This resume is so bland, ${expert} would use it as a case study in what not to do.`,
		];
		const randomRoast = roasts[Math.floor(Math.random() * roasts.length)];
		setRoast(randomRoast);
		setIsRoasting(false);
		setRoastCount(prevCount => prevCount + 1);

		setCliches(['Synergy', 'Think outside the box', 'Results-driven', 'Detail-oriented', 'Team player']);
		setVisualCritique('Your formatting looks like it was done by a caffeinated monkey using Microsoft Paint.');
		setCompareResult(
			'Your resume is 50% less impressive than industry standards. Even entry-level positions are laughing.',
		);
		setAbsurdJobTitle('Chief Buzzword Officer');
		setCelebrityComparison("Your career trajectory is like Charlie Sheen's, but with less 'winning'.");
	};

	const shareRoast = () => {
		handleTweet('Just got roasted by AI! 🤖🔥');
	};

	const handlePremiumAction = (action: string) => {
		setIsModalOpen(true);
	};

	const handleEmailSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		alert(`Email ${email} added to waitlist!`);
		setEmail('');
		setIsModalOpen(false);
	};

	useEffect(() => {
		const marqueeElement = marqueeRef.current;
		if (marqueeElement) {
			const clone = marqueeElement.firstElementChild?.cloneNode(true);
			if (clone) {
				marqueeElement.appendChild(clone);
			}
		}
	}, []);

	const handleRequestRoaster = () => {
		setIsRequestRoasterModalOpen(true);
	};

	const handleNewRoasterSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (newRoasterName.trim()) {
			const newRoaster = {
				id: newRoasterName.toLowerCase().replace(/\s+/g, ''),
				name: newRoasterName,
				image: '/placeholder.svg?height=100&width=100',
			};
			setTechExperts(prev => [...prev, newRoaster]);
			setNewRoasterName('');
			setIsRequestRoasterModalOpen(false);
			alert(`Thanks for suggesting ${newRoasterName}! They've been added to the list of roasters.`);
		}
	};

	return (
		<div className="min-h-screen bg-gradient-to-b from-purple-50 to-yellow-50 flex flex-col items-center justify-between p-8">
			<Particles className="absolute inset-0" quantity={200} ease={80} color={'#A07CFE'} refresh />
			<DotPattern
				width={20}
				height={20}
				cx={1}
				cy={1}
				cr={1}
				className={cn('[mask-image:linear-gradient(to_bottom_right,white,transparent,transparent)] ')}
			/>
			<div className="w-full max-w-4xl flex flex-col items-center text-center space-y-8">
				<h1 className="text-5xl font-bold mt-20">Roast Your Resume</h1>
				<p className="text-xl">Upload your resume and get a fun, insightful roast from tech experts</p>
				{!file && (
					<div
						className="w-full h-64 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-gray-400 transition-colors"
						onDragOver={e => e.preventDefault()}
						onDrop={handleDrop}
						onClick={() => fileInputRef.current?.click()}
					>
						<ShineBorder
							className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl"
							color={['#A07CFE', '#FE8FB5', '#FFBE7B']}
						>
							<Upload className="w-12 h-12 text-gray-400 mb-4" />
							<p className="text-lg text-gray-600 mb-2">Drag and drop your PDF resume here</p>
							<p className="text-sm text-gray-500">or click to select a file</p>
							<input
								type="file"
								ref={fileInputRef}
								className="hidden"
								accept=".pdf"
								onChange={handleFileChange}
							/>
						</ShineBorder>
					</div>
				)}
				{file && !roast && (
					<Card className="w-full">
						<CardContent className="pt-6">
							<p className="text-center text-lg font-medium mb-4">File uploaded: {file.name}</p>
							{isLoadingPdf ? (
								<div className="flex items-center justify-center space-x-2">
									<Loader2 className="h-6 w-6 animate-spin" />
									<span>Extracting text from PDF...</span>
								</div>
							) : pdfText ? (
								<div className="mt-4">
									{/* <h3 className="text-lg font-semibold mb-2">Extracted Text:</h3>
									<div className="max-h-48 overflow-y-auto p-4 bg-gray-50 rounded-lg">
										<pre className="whitespace-pre-wrap font-sans">{pdfText}</pre>
									</div> */}
								</div>
							) : null}

							<h3 className="text-lg font-semibold mb-2 mt-4">Choose your roaster:</h3>
							<div className="flex justify-center space-x-4 mb-4">
								{techExperts.map(expert => (
									<Avatar
										key={expert.id}
										className={`w-16 h-16 cursor-pointer ${
											selectedExpert === expert.id ? 'ring-2 ring-primary' : ''
										}`}
										onClick={() => setSelectedExpert(expert.id)}
									>
										<AvatarImage src={expert.image} alt={expert.name} />
										<AvatarFallback>{expert.name[0]}</AvatarFallback>
									</Avatar>
								))}
								<Avatar
									className="w-16 h-16 cursor-pointer bg-gray-200 hover:bg-gray-300 transition-colors flex items-center justify-center"
									onClick={handleRequestRoaster}
								>
									<Plus className="h-8 w-8 text-gray-600" />
								</Avatar>
							</div>
							<Button onClick={generateRoast} disabled={!selectedExpert}>
								<SparklesText
									text="Generate Free Roast Now"
									className="w-full bg-gray-900 hover:bg-gray-800 text-[white] text-lg font-bold"
								/>
							</Button>
						</CardContent>
					</Card>
				)}
				{isRoasting && (
					<div className="flex flex-col items-center space-y-4 w-full">
						<Loader2 className="h-12 w-12 animate-spin text-gray-900" />
						<p className="text-lg font-medium">{loadingState}</p>
						<Progress value={progress} className="w-full" />
					</div>
				)}
				{roast && (
					<>
						<div className="w-full flex space-x-4">
							<Card className="w-1/2">
								<CardHeader>
									<CardTitle>Your Resume Roast</CardTitle>
								</CardHeader>
								<CardContent className="space-y-4">
									<p className="text-lg">{roast}</p>
									<div className="space-y-2">
										<h3 className="font-semibold">Cliché Detector</h3>
										<ul className="list-disc pl-5">
											{cliches.map((cliche, index) => (
												<li key={index}>{cliche}</li>
											))}
										</ul>
									</div>
									{visualCritique && (
										<div className="space-y-2">
											<h3 className="font-semibold">Visual Critique</h3>
											<p>{visualCritique}</p>
										</div>
									)}
								</CardContent>
							</Card>

							<Card className="w-1/2">
								<CardHeader>
									<CardTitle>Analysis</CardTitle>
								</CardHeader>
								<CardContent className="space-y-4">
									<div className="space-y-2">
										<h3 className="font-semibold">Comparative Analysis</h3>
										<p>{compareResult}</p>
									</div>
									<div className="space-y-2">
										<h3 className="font-semibold">Absurd Job Title</h3>
										<p>{absurdJobTitle}</p>
									</div>
									<div className="space-y-2">
										<h3 className="font-semibold">Celebrity Comparison</h3>
										<p>{celebrityComparison}</p>
									</div>
								</CardContent>
							</Card>
						</div>

						<ShimmerButton
							onClick={shareRoast}
							className="w-full max-w-md py-6 text-md font-bold bg-gray-900 hover:bg-gray-800 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200"
						>
							Show your friends that AI roasted your resume
						</ShimmerButton>

						<div className="w-full">
							<h2 className="text-2xl font-semibold mb-4">Ready for more action?</h2>
							<div className="relative w-full overflow-auto">
								<Marquee pauseOnHover className="[--duration:20s]">
									{premiumFeatures.map((item, index) => (
										<div key={index} className="flex-none w-64">
											<Card
												className="transition-all hover:shadow-lg group h-full"
												onClick={() => handlePremiumAction(item.title)}
											>
												<CardContent className="pt-6 relative flex flex-col items-center justify-center">
													<Badge className="absolute top-2 right-2" variant="secondary">
														Pro
													</Badge>
													<item.icon className="h-8 w-8 mb-2 text-primary" />
													<h3 className="font-semibold mb-2">{item.title}</h3>
													<p className="text-sm text-muted-foreground">{item.description}</p>
												</CardContent>
											</Card>
										</div>
									))}
								</Marquee>
							</div>
						</div>
					</>
				)}
				<p className="text-sm text-gray-600">{roastCount} resume roasts generated and counting...</p>
			</div>

			<div className="w-full max-w-2xl flex flex-col items-center space-y-4">
				<p className="text-sm text-gray-600">
					To report bugs or request new features, please message us{' '}
					<a href="#" className="underline" onClick={() => openTwitterConversation()}>
						here
					</a>
					.
				</p>
			</div>

			<Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Join the Waitlist</DialogTitle>
						<DialogDescription>
							Enter your email to be notified when this premium feature becomes available.
						</DialogDescription>
					</DialogHeader>
					<form onSubmit={handleEmailSubmit} className="space-y-4">
						<div>
							<Label htmlFor="email">Email</Label>
							<Input
								id="email"
								type="email"
								value={email}
								onChange={e => setEmail(e.target.value)}
								placeholder="you@example.com"
								required
							/>
						</div>
						<Button type="submit" className="w-full">
							Join Waitlist
						</Button>
					</form>
				</DialogContent>
			</Dialog>

			<Dialog open={isRequestRoasterModalOpen} onOpenChange={setIsRequestRoasterModalOpen}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Request a New Roaster</DialogTitle>
						<DialogDescription>Suggest a new tech expert to roast your resume.</DialogDescription>
					</DialogHeader>
					<form onSubmit={handleNewRoasterSubmit} className="space-y-4">
						<div>
							<Label htmlFor="newRoasterName">Roaster Name</Label>
							<Input
								id="newRoasterName"
								type="text"
								value={newRoasterName}
								onChange={e => setNewRoasterName(e.target.value)}
								placeholder="e.g., Mark Zuckerberg"
								required
							/>
						</div>
						<Button type="submit" className="w-full">
							Submit Request
						</Button>
					</form>
				</DialogContent>
			</Dialog>
		</div>
	);
}
