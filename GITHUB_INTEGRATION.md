# GitHub Projects Integration

این سیستم به صورت خودکار پروژه‌های public شما از GitHub را دریافت کرده و به صفحه Projects اضافه می‌کند.

## تنظیمات

فایل `src/config/github.ts` را ویرایش کنید:

```typescript
export const githubConfig: GitHubConfig = {
  username: 'ItsOrv', // نام کاربری GitHub شما
  ignoreRepos: [
    // نام repository هایی که نمی‌خواهید نمایش داده شوند
    'old-project',
    'test-repo',
  ],
  manualProjects: [
    // پروژه‌های دستی که می‌خواهید اضافه کنید
    {
      id: 'custom-project',
      title: 'Custom Project',
      description: 'Full description',
      shortDescription: 'Short description',
      githubUrl: 'https://github.com/user/repo',
      liveUrl: 'https://example.com', // اختیاری
      category: 'web-development',
      technologies: ['React', 'TypeScript'],
      featured: true, // اختیاری
      status: 'completed', // اختیاری
    },
  ],
  updateInterval: 60 * 60 * 1000, // هر 1 ساعت (می‌توانید تغییر دهید)
}
```

## ویژگی‌ها

### ✅ دریافت خودکار
- هر 1 ساعت (قابل تنظیم) پروژه‌های GitHub بررسی می‌شوند
- فقط پروژه‌های public نمایش داده می‌شوند
- پروژه‌های archived یا disabled نادیده گرفته می‌شوند

### ✅ Cache
- نتایج در localStorage ذخیره می‌شوند
- در صورت وجود cache معتبر، از API استفاده نمی‌شود
- دکمه Refresh برای به‌روزرسانی دستی

### ✅ Ignore List
- می‌توانید repository های خاصی را ignore کنید
- در `ignoreRepos` اضافه کنید

### ✅ Manual Projects
- می‌توانید پروژه‌های دستی اضافه کنید
- این پروژه‌ها با پروژه‌های GitHub merge می‌شوند
- پروژه‌های دستی اولویت دارند

### ✅ Auto-Detection
- Category بر اساس topics و description تشخیص داده می‌شود
- Technologies از language و topics استخراج می‌شوند
- Status بر اساس آخرین push تعیین می‌شود
- Featured بر اساس stars و forks

## استفاده

هیچ کار اضافی نیاز نیست! سیستم به صورت خودکار کار می‌کند.

برای به‌روزرسانی دستی، دکمه Refresh کنار عنوان Projects را کلیک کنید.

## محدودیت‌های GitHub API

- بدون authentication: 60 request/hour
- با authentication: 5000 request/hour

برای استفاده بیشتر، می‌توانید GitHub Personal Access Token اضافه کنید (در آینده).

## Troubleshooting

### پروژه‌ها نمایش داده نمی‌شوند
1. مطمئن شوید username درست است
2. پروژه‌ها باید public باشند
3. در `ignoreRepos` نباشند
4. Console را برای خطاها بررسی کنید

### Cache قدیمی
- دکمه Refresh را کلیک کنید
- یا localStorage را پاک کنید: `localStorage.removeItem('github_projects_cache')`

