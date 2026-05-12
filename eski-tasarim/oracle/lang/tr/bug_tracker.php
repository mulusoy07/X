<?php

return [

    'errors' => [
        'load_failed'        => 'Bug Tracker yüklenemedi.',
        'bug_not_found'      => 'Hata bulunamadı.',
        'category_not_found' => 'Kategori bulunamadı.',
    ],

    'common' => [
        'title'              => 'Hata Takip',
        'author'             => 'Yazar',
        'categories_title'   => 'Hata Kategorileri',
        'categories_subtitle'=> 'Tüm hata kategorilerine göz atın ve hata bildirin',
        'no_categories'      => 'Kategori bulunamadı.',
    ],

    'widget' => [
        'title'      => 'Son Hatalar',
        'no_bugs'    => 'Henüz hata bildirilmedi.',
        'last_reply' => 'Son yanıt',
    ],

    'detail' => [
        'view_count'          => 'görüntülenme',
        'comment_count'       => 'Yorumlar',
        'add_comment'         => 'Yorum Ekle',
        'section_attachments' => 'Ekler',
        'section_comments'    => 'Yorumlar',
        'status_open'         => 'Açık',
        'status_in_progress'  => 'Devam Ediyor',
        'status_resolved'     => 'Çözüldü',
        'status_closed'       => 'Kapatıldı',
    ],

    'category' => [
        'bug_count'          => 'Toplam Hata',
        'bugs_in_category'   => '{name} Kategorisindeki Hatalar',
        'no_bugs'            => 'Bu kategoride henüz hata yok.',
        'be_first'           => 'Bu kategoride ilk hatayı bildiren siz olun.',
    ],

    'stats' => [
        'title'              => 'İstatistikler',
        'total'              => 'Toplam Hata',
        'open'               => 'Açık',
        'in_progress'        => 'Devam Ediyor',
        'resolved'           => 'Çözüldü',
        'total_short'        => 'Toplam',
        'open_short'         => 'Açık',
        'in_progress_short'  => 'Devam',
        'resolved_short'     => 'Çözüldü',
    ],

    'form' => [
        'create_bug' => [
            'title'             => 'Hata Bildir',
            'priority_low'      => 'Düşük',
            'priority_medium'   => 'Orta',
            'priority_high'     => 'Yüksek',
            'priority_critical' => 'Kritik',
        ],
    ],

    'comment_form' => [
        'title'               => 'Yorum Ekle',
        'comment_placeholder' => 'Yorumunuzu buraya yazın...',
        'comment_required'    => 'Yorum gereklidir.',
        'comment_too_short'   => 'Yorum en az 5 karakter olmalıdır.',
        'error'               => 'Yorum gönderilirken bir hata oluştu.',
        'submitting'          => 'Gönderiliyor...',
        'submit'              => 'Yorum Gönder',
        'login_required'      => 'Hata bildirmek için giriş yapmalısınız.',
        'login_link'          => 'Giriş Yap',
    ],

];
