export interface GithubIssue {
    "total_count": number;
    "incomplete_results": boolean;
    "items": Issue[]
}

export interface Issue {
    url: string;
    repository_url: string;
    labels_url: string;
    comments_url: string;
    events_url: string;
    html_url: string;
    id: number;
    node_id: string;
    number: number;
    title: string;
    user: Assignee;
    labels: any[];
    state: string;
    locked: boolean;
    assignee: Assignee;
    assignees: Assignee[];
    milestone: null;
    comments: number;
    created_at: string;
    updated_at: string;
    closed_at: string | null;
    author_association: string;
    active_lock_reason: null;
    draft: boolean;
    pull_request: PullRequest;
    body: string | null;
    reactions: Reactions;
    timeline_url: string;
    performed_via_github_app: null;
    state_reason: null;
    score: number;
}

export interface Assignee {
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    gravatar_id: string;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    type: string;
    site_admin: boolean;
}

export interface PullRequest {
    url: string;
    html_url: string;
    diff_url: string;
    patch_url: string;
    merged_at: string | null;
}

export interface Reactions {
    url: string;
    total_count: number;
    "+1": number;
    "-1": number;
    laugh: number;
    hooray: number;
    confused: number;
    heart: number;
    rocket: number;
    eyes: number;
}

export interface DbEvent {
    authUserId: string;
    createdAt: string;
    eventId: string;
    prId: number;
    type: "approves" | "comments";
}

export enum EventTypes {
    PULL_REQUEST_REVIEW_COMMENT_EVENT = "PullRequestReviewCommentEvent",
    PULL_REQUEST_REVIEW_EVENT = "PullRequestReviewEvent"
}
export const eventTypes = ["PullRequestReviewCommentEvent", "PullRequestReviewEvent"]
export interface PullRequestReviewCommentEvent {
    id: string;
    type: EventTypes.PULL_REQUEST_REVIEW_COMMENT_EVENT;
    payload: {
        pull_request: {
            id: number;
        }
    };
    created_at: string;
}

export interface PullRequestReviewEvent {
    id: string;
    type: EventTypes.PULL_REQUEST_REVIEW_EVENT;
    payload: {
        review: {
            state: "commented" | "approved";
        };
        pull_request: {
            id: number;
        }
    };
    created_at: string;
}

export type Event = PullRequestReviewCommentEvent | PullRequestReviewEvent