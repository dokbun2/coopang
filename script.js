// 스크롤 시 헤더 스타일 변경
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 50) {
        header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
    } else {
        header.style.backgroundColor = '#fff';
        header.style.boxShadow = 'none';
    }
});

// 카드 호버 효과
document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// 페이지네이션 기능
const initPagination = () => {
    const paginationNumbers = document.querySelectorAll('.pagination-number');
    const prevBtn = document.querySelector('.pagination-btn.prev');
    const nextBtn = document.querySelector('.pagination-btn.next');
    let currentPage = 1;
    const totalPages = paginationNumbers.length;

    // 페이지 번호 클릭 이벤트
    paginationNumbers.forEach((number, index) => {
        number.addEventListener('click', () => {
            currentPage = index + 1;
            updatePagination();
        });
    });

    // 이전 버튼 클릭 이벤트
    prevBtn.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            updatePagination();
        }
    });

    // 다음 버튼 클릭 이벤트
    nextBtn.addEventListener('click', () => {
        if (currentPage < totalPages) {
            currentPage++;
            updatePagination();
        }
    });

    // 페이지네이션 상태 업데이트
    const updatePagination = () => {
        // 활성 페이지 번호 업데이트
        paginationNumbers.forEach((number, index) => {
            if (index + 1 === currentPage) {
                number.classList.add('active');
            } else {
                number.classList.remove('active');
            }
        });

        // 이전/다음 버튼 상태 업데이트
        prevBtn.disabled = currentPage === 1;
        nextBtn.disabled = currentPage === totalPages;
    };

    // 초기 상태 설정
    updatePagination();
};

// 페이지 로드 시 페이지네이션 초기화
window.addEventListener('load', () => {
    initPagination();
});

// 사이드 배너의 상단 위치를 배너 상단 끝선과 맞추기
function syncAdSideTopToBanner() {
    const banner = document.querySelector('.banner');
    const adSides = document.querySelectorAll('.ad-side');
    if (banner && adSides.length > 0) {
        const bannerRect = banner.getBoundingClientRect();
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const bannerTop = bannerRect.top + scrollTop;
        adSides.forEach(ad => {
            ad.style.top = bannerTop + 'px';
        });
    }
}

window.addEventListener('load', syncAdSideTopToBanner);
window.addEventListener('resize', syncAdSideTopToBanner);

// 카드 렌더링 함수
function renderCards(category = 'all') {
    const cardGrid = document.getElementById('cardGrid');
    cardGrid.innerHTML = '';
    let filtered = products;
    if (category !== 'all') {
        filtered = products.filter(p => p.category === category);
    }
    filtered.forEach(product => {
        const cardWrapper = document.createElement(product.link && product.link !== '#' ? 'a' : 'div');
        if (product.link && product.link !== '#') {
            cardWrapper.href = product.link;
            cardWrapper.className = 'card-link';
            cardWrapper.target = '_blank';
        }
        const card = document.createElement('div');
        card.className = 'card';
        card.setAttribute('data-category', product.category);
        const cardImage = document.createElement('div');
        cardImage.className = 'card-image';
        const img = document.createElement('img');
        img.src = product.image;
        img.alt = product.alt;
        cardImage.appendChild(img);
        card.appendChild(cardImage);
        cardWrapper.appendChild(card);
        cardGrid.appendChild(cardWrapper);
    });
}

// 카테고리 필터링 기능
function initCategoryFilter() {
    const buttons = document.querySelectorAll('.category-btn');
    buttons.forEach(btn => {
        btn.addEventListener('click', function() {
            buttons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            const category = this.getAttribute('data-category');
            renderCards(category);
        });
    });
}

window.addEventListener('load', () => {
    initPagination();
    renderCards();
    initCategoryFilter();
}); 