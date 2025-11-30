import { useForm } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';
import { MessageSquare, Star, Bug, Sparkles, Lightbulb, HelpCircle } from 'lucide-react';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';
import { route } from 'ziggy-js';

interface FeedbackDialogProps {
    trigger?: React.ReactNode;
    page?: string;
}

const feedbackTypes = [
    { value: 'bug', label: 'Bug Report', icon: Bug },
    { value: 'feature', label: 'Feature Request', icon: Sparkles },
    { value: 'improvement', label: 'Improvement', icon: Lightbulb },
    { value: 'rating', label: 'Rating', icon: Star },
    { value: 'other', label: 'Other', icon: HelpCircle },
];

export default function FeedbackDialog({ trigger, page }: FeedbackDialogProps) {
    const [open, setOpen] = useState(false);
    const [rating, setRating] = useState<number | null>(null);
    const [selectedType, setSelectedType] = useState<string>('other');

    const { data, setData, post, processing, errors, reset, clearErrors } = useForm({
        type: 'other',
        subject: '',
        message: '',
        rating: null as number | null,
        page: page || '',
    });

    const handleRatingClick = (value: number) => {
        setRating(value);
        setData('rating', value);
        // Set default type based on rating
        if (value <= 2) {
            setSelectedType('bug');
            setData('type', 'bug');
        } else {
            setSelectedType('improvement');
            setData('type', 'improvement');
        }
    };

    const handleTypeChange = (value: string) => {
        setSelectedType(value);
        setData('type', value);
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        if (!rating) {
            toast.error('Please select a rating first');
            return;
        }

        post(route('feedback.store'), {
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Thank you for your feedback!');
                setOpen(false);
                reset();
                setRating(null);
                setSelectedType('other');
                clearErrors();
            },
            onError: () => {
                toast.error('Failed to submit feedback. Please try again.');
            },
        });
    };

    const handleOpenChange = (isOpen: boolean) => {
        setOpen(isOpen);
        if (!isOpen) {
            reset();
            clearErrors();
            setRating(null);
            setSelectedType('other');
        }
    };


    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
                {trigger || (
                    <Button variant="outline" size="sm">
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Feedback
                    </Button>
                )}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Send Feedback</DialogTitle>
                    <DialogDescription>
                        How would you rate your experience? Your feedback helps us improve!
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={submit} className="space-y-4">
                    {/* Rating - Always shown first and required */}
                    <div className="space-y-2">
                        <Label>Rating <span className="text-red-500">*</span></Label>
                        <div className="flex items-center gap-2 justify-center py-2">
                            {[1, 2, 3, 4, 5].map((value) => (
                                <button
                                    key={value}
                                    type="button"
                                    onClick={() => handleRatingClick(value)}
                                    className={`transition-all ${
                                        rating === value
                                            ? 'scale-110'
                                            : 'hover:scale-105'
                                    }`}
                                >
                                    <Star
                                        className={`h-10 w-10 ${
                                            rating && rating >= value
                                                ? 'fill-yellow-400 text-yellow-400'
                                                : 'text-gray-300 hover:text-yellow-300'
                                        }`}
                                    />
                                </button>
                            ))}
                        </div>
                        {rating && (
                            <p className="text-xs text-center text-muted-foreground">
                                {rating === 1 && '😞 Very Poor'}
                                {rating === 2 && '😕 Poor'}
                                {rating === 3 && '😐 Fair'}
                                {rating === 4 && '🙂 Good'}
                                {rating === 5 && '😊 Excellent'}
                            </p>
                        )}
                        <InputError message={errors.rating} />
                    </div>

                    {/* Type selector - Only shown after rating is selected */}
                    {rating && (
                        <div className="space-y-2">
                            <Label htmlFor="type">Type <span className="text-muted-foreground text-xs">(optional)</span></Label>
                            <Select value={selectedType} onValueChange={handleTypeChange}>
                                <SelectTrigger id="type" className="!w-full">
                                    <SelectValue placeholder="Select feedback type" />
                                </SelectTrigger>
                                <SelectContent>
                                    {feedbackTypes.filter(type => type.value !== 'rating').map((type) => (
                                        <SelectItem key={type.value} value={type.value}>
                                            <div className="flex items-center gap-2">
                                                <type.icon className="h-4 w-4" />
                                                {type.label}
                                            </div>
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <InputError message={errors.type} />
                        </div>
                    )}

                    {/* Subject - Optional, shown after rating */}
                    {rating && selectedType && (
                        <div className="space-y-2">
                            <Label htmlFor="subject">Subject <span className="text-muted-foreground text-xs">(optional)</span></Label>
                            <Input
                                id="subject"
                                value={data.subject}
                                onChange={(e) => setData('subject', e.target.value)}
                                placeholder={
                                    selectedType === 'bug'
                                        ? 'e.g., Login button not working'
                                        : selectedType === 'feature'
                                        ? 'e.g., Add dark mode toggle'
                                        : 'Brief summary...'
                                }
                            />
                            <InputError message={errors.subject} />
                        </div>
                    )}

                    {/* Message - Optional */}
                    <div className="space-y-2">
                        <Label htmlFor="message">
                            Message <span className="text-muted-foreground text-xs">(optional)</span>
                        </Label>
                        <Textarea
                            id="message"
                            value={data.message}
                            onChange={(e) => setData('message', e.target.value)}
                            placeholder={
                                selectedType === 'bug'
                                    ? 'Describe the bug, steps to reproduce, and expected behavior...'
                                    : selectedType === 'feature'
                                    ? 'Share your feature idea and how it would help...'
                                    : 'Tell us more about your experience...'
                            }
                            rows={5}
                        />
                        <InputError message={errors.message} />
                    </div>

                    <DialogFooter>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => handleOpenChange(false)}
                            disabled={processing}
                        >
                            Cancel
                        </Button>
                        <Button type="submit" disabled={processing}>
                            {processing ? 'Sending...' : 'Send Feedback'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}

