'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
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
import Marquee from './ui/marquee';
import { RainbowButton } from './ui/rainbow-button';
import ShimmerButton from './ui/shimmer-button';

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
	const [celebrityComparison, setCelebrityComparison] = useState<
		string | null
	>(null);
	const [loadingState, setLoadingState] = useState('');
	const [progress, setProgress] = useState(0);
	const [email, setEmail] = useState('');
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isRequestRoasterModalOpen, setIsRequestRoasterModalOpen] =
		useState(false);
	const [newRoasterName, setNewRoasterName] = useState('');
	const [techExperts, setTechExperts] = useState(initialTechExperts);

	const marqueeRef = useRef<HTMLDivElement>(null);
	const fileInputRef = useRef<HTMLInputElement>(null);

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files && event.target.files[0]) {
			setFile(event.target.files[0]);
			setRoast(null);
			setCliches([]);
			setVisualCritique(null);
			setCompareResult(null);
			setAbsurdJobTitle(null);
			setCelebrityComparison(null);
		}
	};

	const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
		event.preventDefault();
		if (event.dataTransfer.files && event.dataTransfer.files[0]) {
			setFile(event.dataTransfer.files[0]);
			setRoast(null);
			setCliches([]);
			setVisualCritique(null);
			setCompareResult(null);
			setAbsurdJobTitle(null);
			setCelebrityComparison(null);
		}
	};

	const generateRoast = () => {
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
				finishRoast();
			}
		}, 1000);
	};

	const finishRoast = () => {
		const roasts = [
			`Your resume is so generic, ${selectedExpert} wouldn't even use it as scratch paper.`,
			`${selectedExpert} called. They want their buzzwords back.`,
			`If ${selectedExpert} saw this resume, they'd think AI wrote it... poorly.`,
			`${selectedExpert} would hire you... to rewrite your resume.`,
			`This resume is so bland, ${selectedExpert} would use it as a case study in what not to do.`,
		];
		const randomRoast = roasts[Math.floor(Math.random() * roasts.length)];
		setRoast(randomRoast);
		setIsRoasting(false);
		setRoastCount((prevCount) => prevCount + 1);

		setCliches([
			'Synergy',
			'Think outside the box',
			'Results-driven',
			'Detail-oriented',
			'Team player',
		]);
		setVisualCritique(
			"Your photo looks like it was taken at a drive-thru. Next time, maybe don't use the fry station as a backdrop."
		);
		setCompareResult(
			'Your resume is 50% less impressive than industry standards. Even entry-level positions are laughing.'
		);
		setAbsurdJobTitle('Chief Buzzword Officer');
		setCelebrityComparison(
			"Your career trajectory is like Charlie Sheen's, but with less 'winning'."
		);
	};

	const shareRoast = () => {
		alert('Sharing functionality would be implemented here!');
	};

	const saveRoast = () => {
		alert('Saving functionality would be implemented here!');
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
			setTechExperts((prev) => [...prev, newRoaster]);
			setNewRoasterName('');
			setIsRequestRoasterModalOpen(false);
			alert(
				`Thanks for suggesting ${newRoasterName}! They've been added to the list of roasters.`
			);
		}
	};
	return (
		<div className="min-h-screen bg-gradient-to-b from-purple-50 to-yellow-50 flex flex-col items-center justify-between p-8">
			<div className="w-full max-w-4xl flex flex-col items-center text-center space-y-8">
				<h1 className="text-5xl font-bold mt-20">Roast Your Resume</h1>
				<p className="text-xl">
					Upload your resume and get a fun, insightful roast from tech
					experts
				</p>
				{!file && (
					<div
						className="w-full h-64 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-gray-400 transition-colors"
						onDragOver={(e) => e.preventDefault()}
						onDrop={handleDrop}
						onClick={() => fileInputRef.current?.click()}
					>
						<Upload className="w-12 h-12 text-gray-400 mb-4" />
						<p className="text-lg text-gray-600 mb-2">
							Drag and drop your resume here
						</p>
						<p className="text-sm text-gray-500">
							or click to select a file
						</p>
						<input
							type="file"
							ref={fileInputRef}
							className="hidden"
							accept=".pdf,.doc,.docx"
							onChange={handleFileChange}
						/>
					</div>
				)}
				{file && !roast && !isRoasting && (
					<Card className="w-full">
						<CardContent className="pt-6">
							<p className="text-center text-lg font-medium mb-4">
								File uploaded: {file.name}
							</p>
							<h3 className="text-lg font-semibold mb-2">
								Choose your roaster:
							</h3>
							<div className="flex justify-center space-x-4 mb-4">
								{techExperts.map((expert) => (
									<Avatar
										key={expert.id}
										className={`w-16 h-16 cursor-pointer ${
											selectedExpert === expert.id
												? 'ring-2 ring-primary'
												: ''
										}`}
										onClick={() =>
											setSelectedExpert(expert.id)
										}
									>
										<AvatarImage
											src={expert.image}
											alt={expert.name}
										/>
										<AvatarFallback>
											{expert.name[0]}
										</AvatarFallback>
									</Avatar>
								))}
								<Avatar
									className="w-16 h-16 cursor-pointer bg-gray-200 hover:bg-gray-300 transition-colors flex items-center justify-center"
									onClick={handleRequestRoaster}
								>
									<Plus className="h-8 w-8 text-gray-600" />
								</Avatar>
							</div>
							<Button
								onClick={generateRoast}
								disabled={!selectedExpert}
								className="w-full bg-gray-900 hover:bg-gray-800 text-[white] text-lg font-bold"
							>
								Generate Free Roast Now
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
										<h3 className="font-semibold">
											Cliché Detector
										</h3>
										<ul className="list-disc pl-5">
											{cliches.map((cliche, index) => (
												<li key={index}>{cliche}</li>
											))}
										</ul>
									</div>
									{visualCritique && (
										<div className="space-y-2">
											<h3 className="font-semibold">
												Visual Critique
											</h3>
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
										<h3 className="font-semibold">
											Comparative Analysis
										</h3>
										<p>{compareResult}</p>
									</div>
									<div className="space-y-2">
										<h3 className="font-semibold">
											Absurd Job Title
										</h3>
										<p>{absurdJobTitle}</p>
									</div>
									<div className="space-y-2">
										<h3 className="font-semibold">
											Celebrity Comparison
										</h3>
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
							<h2 className="text-2xl font-semibold mb-4">
								Ready for more action?
							</h2>
							<div className="relative w-full overflow-auto">
								<Marquee
									pauseOnHover
									className="[--duration:20s]"
								>
									{premiumFeatures.map((item, index) => (
										<div
											key={index}
											className="flex-none w-64"
										>
											<Card
												className=" transition-all hover:shadow-lg group h-full"
												onClick={() =>
													handlePremiumAction(
														item.title
													)
												}
											>
												<CardContent className="pt-6 relative flex flex-col items-center justify-center">
													<Badge
														className="absolute top-2 right-2"
														variant="secondary"
													>
														Pro
													</Badge>
													<item.icon className="h-8 w-8 mb-2 text-primary" />
													<h3 className="font-semibold mb-2">
														{item.title}
													</h3>
													<p className="text-sm text-muted-foreground">
														{item.description}
													</p>
													{/* <Button
                            className="w-full mt-4 opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => handlePremiumAction(item.title)}
                          >
                            Interested
                          </Button> */}
												</CardContent>
											</Card>
										</div>
									))}
								</Marquee>
							</div>
						</div>
					</>
				)}

				<p className="text-sm text-gray-600">
					{roastCount} resume roasts generated and counting...
				</p>
			</div>
			<div className="w-full max-w-2xl flex flex-col items-center space-y-4">
				{/* <Badge  variant="outline" className="bg-white px-4 py-1">
          <span className="mr-2">🏆</span>
          PRODUCT HUNT
          <span className="ml-2 font-bold text-red-500">#2 Product of the Day</span>
        </Badge> */}
				<p className="text-sm text-gray-600">
					To report bugs or request new features, please message us{' '}
					<a href="#" className="underline">
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
							Enter your email to be notified when this premium
							feature becomes available.
						</DialogDescription>
					</DialogHeader>
					<form onSubmit={handleEmailSubmit} className="space-y-4">
						<div>
							<Label htmlFor="email">Email</Label>
							<Input
								id="email"
								type="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
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
			<Dialog
				open={isRequestRoasterModalOpen}
				onOpenChange={setIsRequestRoasterModalOpen}
			>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Request a New Roaster</DialogTitle>
						<DialogDescription>
							Suggest a new tech expert to roast your resume.
						</DialogDescription>
					</DialogHeader>
					<form
						onSubmit={handleNewRoasterSubmit}
						className="space-y-4"
					>
						<div>
							<Label htmlFor="newRoasterName">Roaster Name</Label>
							<Input
								id="newRoasterName"
								type="text"
								value={newRoasterName}
								onChange={(e) =>
									setNewRoasterName(e.target.value)
								}
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
