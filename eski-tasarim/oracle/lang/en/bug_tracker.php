<?php

return [

    'errors' => [
        'load_failed'        => 'Failed to load Bug Tracker.',
        'bug_not_found'      => 'Bug not found.',
        'category_not_found' => 'Category not found.',
    ],

    'common' => [
        'title'              => 'Bug Tracker',
        'author'             => 'Author',
        'categories_title'   => 'Bug Categories',
        'categories_subtitle'=> 'Browse all bug categories and report issues',
        'no_categories'      => 'No categories found.',
    ],

    'widget' => [
        'title'      => 'Recent Bugs',
        'no_bugs'    => 'No bugs reported yet.',
        'last_reply' => 'Last reply',
    ],

    'detail' => [
        'view_count'          => 'views',
        'comment_count'       => 'Comments',
        'add_comment'         => 'Add Comment',
        'section_attachments' => 'Attachments',
        'section_comments'    => 'Comments',
        'status_open'         => 'Open',
        'status_in_progress'  => 'In Progress',
        'status_resolved'     => 'Resolved',
        'status_closed'       => 'Closed',
    ],

    'category' => [
        'bug_count'          => 'Total Bugs',
        'bugs_in_category'   => 'Bugs in {name}',
        'no_bugs'            => 'No bugs in this category.',
        'be_first'           => 'Be the first to report a bug in this category.',
    ],

    'stats' => [
        'title'              => 'Statistics',
        'total'              => 'Total Bugs',
        'open'               => 'Open',
        'in_progress'        => 'In Progress',
        'resolved'           => 'Resolved',
        'total_short'        => 'Total',
        'open_short'         => 'Open',
        'in_progress_short'  => 'Progress',
        'resolved_short'     => 'Resolved',
    ],

    'form' => [
        'create_bug' => [
            'title'             => 'Report Bug',
            'priority_low'      => 'Low',
            'priority_medium'   => 'Medium',
            'priority_high'     => 'High',
            'priority_critical' => 'Critical',
        ],
    ],

    'comment_form' => [
        'title'               => 'Add a Comment',
        'comment_placeholder' => 'Write your comment here...',
        'comment_required'    => 'Comment is required.',
        'comment_too_short'   => 'Comment must be at least 5 characters.',
        'error'               => 'An error occurred while submitting your comment.',
        'submitting'          => 'Submitting...',
        'submit'              => 'Submit Comment',
        'login_required'      => 'You must be logged in to report a bug.',
        'login_link'          => 'Login',
    ],

];
