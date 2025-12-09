// 初始化AOS动画库
document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 800,
        once: true,
        offset: 100
    });
    
    // 移动菜单切换
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const closeMobileMenuButton = document.getElementById('close-mobile-menu');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    
    mobileMenuButton.addEventListener('click', function() {
        mobileMenu.classList.add('active');
    });
    
    closeMobileMenuButton.addEventListener('click', function() {
        mobileMenu.classList.remove('active');
    });
    
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
        });
    });
    
    // 计数器动画
    const counterElements = document.querySelectorAll('.counter-value');
    let animated = false;
    
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
            rect.bottom >= 0
        );
    }
    
    function animateCounter(element) {
        const target = parseInt(element.getAttribute('data-target'));
        const duration = 2000; // 2秒
        const step = target / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            
            if (element.textContent.includes('%')) {
                element.textContent = Math.floor(current) + '%';
            } else if (element.textContent.includes('+')) {
                element.textContent = Math.floor(current) + '+';
            } else {
                element.textContent = Math.floor(current);
            }
        }, 16);
    }
    
    function checkScroll() {
        if (!animated && counterElements.length > 0 && isInViewport(counterElements[0])) {
            counterElements.forEach(counter => {
                animateCounter(counter);
            });
            animated = true;
        }
    }
    
    window.addEventListener('scroll', checkScroll);
    checkScroll(); // 页面加载时检查
    
    // 返回顶部按钮
    const backToTopButton = document.getElementById('back-to-top');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.remove('opacity-0', 'invisible');
            backToTopButton.classList.add('opacity-100', 'visible');
        } else {
            backToTopButton.classList.remove('opacity-100', 'visible');
            backToTopButton.classList.add('opacity-0', 'invisible');
        }
    });
    
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // 聊天窗口切换
    const chatButton = document.getElementById('chat-button');
    const chatWindow = document.getElementById('chat-window');
    const closeChatButton = document.getElementById('close-chat');
    const chatForm = document.getElementById('chat-form');
    const chatInput = document.getElementById('chat-input');
    const chatMessages = document.getElementById('chat-messages');
    
    chatButton.addEventListener('click', function() {
        chatWindow.classList.toggle('hidden');
    });
    
    closeChatButton.addEventListener('click', function() {
        chatWindow.classList.add('hidden');
    });
    
    chatForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const message = chatInput.value.trim();
        if (message) {
            // 添加用户消息
            chatMessages.innerHTML += `
                <div class="flex justify-end mb-4">
                    <div class="mr-3 bg-primary text-white p-3 rounded-lg max-w-[80%]">
                        <p>${message}</p>
                    </div>
                    <div class="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center flex-shrink-0">
                        <i class="fas fa-user"></i>
                    </div>
                </div>
            `;
            
            chatInput.value = '';
            chatMessages.scrollTop = chatMessages.scrollHeight;
            
            // 模拟短延迟后的响应
            setTimeout(() => {
                chatMessages.innerHTML += `
                    <div class="flex mb-4">
                        <div class="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white flex-shrink-0">
                            <i class="fas fa-headset"></i>
                        </div>
                        <div class="ml-3 bg-neutral-light p-3 rounded-lg max-w-[80%]">
                            <p>感谢您的咨询！我们的客服人员将尽快回复您的问题。您也可以直接拨打我们的客服热线：400-888-8888.<br>
                            或者添加以下微信</p>
                            <img src="./photo/wechat-qrcode.png">
                            
    
                        </div>
                    </div>
                `;
                chatMessages.scrollTop = chatMessages.scrollHeight;
            }, 1000);
        }
    });
    
    // AI计算器
    const calculateBtn = document.getElementById('calculate-btn');
    const calculatorForm = document.getElementById('calculator-form');
    const resultSection = document.getElementById('result-section');
    const loadingSection = document.getElementById('loading-section');
    
    calculateBtn.addEventListener('click', function() {
        // 验证表单
        const 货物类型 = document.getElementById('货物类型').value;
        const 货物价值 = document.getElementById('货物价值').value;
        const 货物重量 = document.getElementById('货物重量').value;
        const 起运国 = document.getElementById('起运国').value;
        const 运输方式 = document.getElementById('运输方式').value;
        
        if (!货物类型 || !货物价值 || !货物重量 || !起运国 || !运输方式) {
            alert('请填写所有必填字段');
            return;
        }
        
        // 显示加载
        loadingSection.classList.remove('hidden');
        calculatorForm.classList.add('hidden');
        
        // 模拟AI计算
        setTimeout(() => {
            // 隐藏加载，显示结果
            loadingSection.classList.add('hidden');
            resultSection.classList.remove('hidden');
            
            // 根据输入值计算成本
            const value = parseFloat(货物价值);
            const weight = parseFloat(货物重量);
            
            // 基本费率计算（演示简化版）
            let baseRate = 0;
            if (运输方式 === 'sea') {
                baseRate = weight * 5;
            } else if (运输方式 === 'air') {
                baseRate = weight * 15;
            } else if (运输方式 === 'land') {
                baseRate = weight * 8;
            } else if (运输方式 === 'express') {
                baseRate = weight * 25;
            }
            
            // 关税计算（演示简化版）
            let dutyRate = 0;
            if (货物类型 === 'electronics') {
                dutyRate = 0.10; // 10%
            } else if (货物类型 === 'clothing') {
                dutyRate = 0.15; // 15%
            } else if (货物类型 === 'food') {
                dutyRate = 0.20; // 20%
            } else if (货物类型 === 'machinery') {
                dutyRate = 0.08; // 8%
            } else {
                dutyRate = 0.12; // 12%
            }
            
            const duty = value * dutyRate;
            const vat = (value + duty) * 0.13; // 13%增值税
            const other = baseRate * 0.2; // 其他费用为基本费率的20%
            const total = baseRate + duty + vat + other;
            
            // 更新结果值
            document.getElementById('基础费用').textContent = '$' + baseRate.toFixed(2);
            document.getElementById('关税').textContent = '$' + duty.toFixed(2);
            document.getElementById('增值税').textContent = '$' + vat.toFixed(2);
            document.getElementById('其他费用').textContent = '$' + other.toFixed(2);
            document.getElementById('总计').textContent = '$' + total.toFixed(2);
        }, 2000);
    });
    
    // 联系表单提交
    const contactForm = document.getElementById('contact-form');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // 显示成功消息
        alert('感谢您的咨询！我们的客服人员将尽快与您联系。');
        contactForm.reset();
    });
});
// 添加到你的JavaScript文件中
document.addEventListener('DOMContentLoaded', function() {
  const wechatIcon = document.querySelector('.wechat-icon'); // 替换为你的微信图标选择器
  const qrcodeContainer = document.querySelector('.wechat-qrcode-container');
  
  if (wechatIcon && qrcodeContainer) {
    // 鼠标悬停显示
    wechatIcon.addEventListener('mouseenter', function(e) {
      // 计算二维码位置（基于图标位置）
      const rect = wechatIcon.getBoundingClientRect();
      qrcodeContainer.style.left = `${rect.left - 150}px`; // 向左偏移
      qrcodeContainer.style.top = `${rect.top - 200}px`;  // 向上偏移
      qrcodeContainer.classList.remove('hidden');
    });
    
    // 鼠标离开隐藏
    wechatIcon.addEventListener('mouseleave', function() {
      qrcodeContainer.classList.add('hidden');
    });
    
    // 二维码容器自身的鼠标事件，防止快速切换
    qrcodeContainer.addEventListener('mouseenter', function() {
      qrcodeContainer.classList.remove('hidden');
    });
    
    qrcodeContainer.addEventListener('mouseleave', function() {
      qrcodeContainer.classList.add('hidden');
    });
  }
});
// 确保回到顶部按钮元素添加了.back-to-top类
const backToTopBtn = document.createElement('button');
backToTopBtn.className = 'back-to-top';
backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
document.body.appendChild(backToTopBtn);

// 滚动显示/隐藏回到顶部按钮
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopBtn.classList.add('active');
    } else {
        backToTopBtn.classList.remove('active');
    }
});

// 回到顶部功能
backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});
// 获取元素（保留原有，新增手机号相关）
const wechatLink = document.getElementById('wechat-link');
const wechatModal = document.getElementById('wechat-modal');
const closeModal = document.getElementById('close-modal');

// 微信号相关（原有）
const copyWechatBtn = document.getElementById('copy-wechat-btn');
const wechatId = document.getElementById('wechat-id');
const copyWechatSuccess = document.getElementById('copy-wechat-success');

// 新增：手机号相关
const copyPhoneBtn = document.getElementById('copy-phone-btn');
const phoneNum = document.getElementById('phone-num');
const copyPhoneSuccess = document.getElementById('copy-phone-success');

// 打开弹窗（原有）
wechatLink.addEventListener('click', function(e) {
  e.preventDefault(); // 阻止默认链接行为
  wechatModal.classList.remove('hidden');
  setTimeout(() => {
    wechatModal.querySelector('div').classList.add('scale-100');
    wechatModal.querySelector('div').classList.remove('scale-95');
  }, 10);
});

// 关闭弹窗（优化：清空所有复制成功提示）
function closeWechatModal() {
  wechatModal.querySelector('div').classList.remove('scale-100');
  wechatModal.querySelector('div').classList.add('scale-95');
  setTimeout(() => {
    wechatModal.classList.add('hidden');
    // 新增：关闭时隐藏所有复制成功提示
    copyWechatSuccess.classList.add('hidden');
    copyPhoneSuccess.classList.add('hidden');
  }, 300);
}
closeModal.addEventListener('click', closeWechatModal);

// 点击弹窗外部关闭（原有）
wechatModal.addEventListener('click', function(e) {
  if (e.target === wechatModal) {
    closeWechatModal();
  }
});

// 复制微信号（原有，优化按钮ID）
copyWechatBtn.addEventListener('click', function() {
  copyText(wechatId.textContent, copyWechatSuccess);
});

// 新增：复制手机号
copyPhoneBtn.addEventListener('click', function() {
  copyText(phoneNum.textContent, copyPhoneSuccess);
});

// 封装通用复制函数（复用逻辑，避免重复代码）
function copyText(text, successElement) {
  navigator.clipboard.writeText(text)
    .then(() => {
      successElement.classList.remove('hidden');
      // 2秒后隐藏成功提示
      setTimeout(() => {
        successElement.classList.add('hidden');
      }, 2000);
    })
    .catch(err => {
      console.error('复制失败: ', err);
      alert('复制失败，请手动复制');
    });
}

