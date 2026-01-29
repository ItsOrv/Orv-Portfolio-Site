# راهنمای تنظیم GitHub Projects Integration

## تنظیمات اولیه

### 1. ویرایش فایل Config

فایل `src/config/github.ts` را باز کنید و تنظیمات را انجام دهید:

```typescript
export const githubConfig: GitHubConfig = {
  username: 'ItsOrv', // 👈 نام کاربری GitHub خود را وارد کنید
  ignoreRepos: [
    // 👇 Repository هایی که نمی‌خواهید نمایش داده شوند
    'old-project',
    'test-repo',
    'private-backup',
  ],
  manualProjects: [
    // 👇 پروژه‌های دستی (اختیاری)
    {
      id: 'custom-project-1',
      title: 'My Custom Project',
      description: 'This is a detailed description of my custom project...',
      shortDescription: 'A custom project description',
      githubUrl: 'https://github.com/ItsOrv/custom-project',
      liveUrl: 'https://custom-project.com', // اختیاری
      category: 'web-development', // یا 'telegram-bot', 'cybersecurity', 'ai-ml'
      technologies: ['React', 'TypeScript', 'Node.js'],
      featured: true, // آیا در featured projects نمایش داده شود؟
      status: 'completed', // یا 'in-progress', 'planned'
    },
  ],
  updateInterval: 60 * 60 * 1000, // هر 1 ساعت (می‌توانید تغییر دهید)
}
```

### 2. دسته‌بندی‌های موجود

- `web-development` - پروژه‌های وب
- `telegram-bot` - ربات‌های تلگرام
- `cybersecurity` - امنیت سایبری
- `ai-ml` - هوش مصنوعی و یادگیری ماشین

### 3. نحوه کار

1. **دریافت خودکار**: سیستم هر 1 ساعت (یا طبق `updateInterval`) پروژه‌های GitHub را بررسی می‌کند
2. **Cache**: نتایج در localStorage ذخیره می‌شوند تا از API کمتر استفاده شود
3. **Merge**: پروژه‌های GitHub با پروژه‌های دستی و static merge می‌شوند
4. **اولویت**: پروژه‌های static > manual > GitHub

### 4. ویژگی‌های خودکار

- ✅ **Category Detection**: بر اساس topics و description
- ✅ **Technologies**: از language و topics استخراج می‌شوند
- ✅ **Status**: بر اساس آخرین push (90+ روز = completed)
- ✅ **Featured**: پروژه‌هایی با 5+ stars یا 2+ forks
- ✅ **Image**: از Open Graph GitHub استفاده می‌شود

### 5. دکمه Refresh

در صفحه Projects، کنار عنوان یک دکمه Refresh وجود دارد که می‌توانید برای به‌روزرسانی دستی استفاده کنید.

### 6. مثال Manual Project

```typescript
{
  id: 'my-special-project',
  title: 'My Special Project',
  description: 'A comprehensive description of what this project does, its features, and impact.',
  shortDescription: 'A brief one-line description',
  githubUrl: 'https://github.com/ItsOrv/my-special-project',
  liveUrl: 'https://my-special-project.vercel.app', // اختیاری
  category: 'web-development',
  technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Prisma'],
  featured: true,
  status: 'in-progress',
}
```

### 7. Troubleshooting

**مشکل**: پروژه‌ها نمایش داده نمی‌شوند
- ✅ مطمئن شوید username درست است
- ✅ پروژه‌ها باید public باشند
- ✅ در `ignoreRepos` نباشند
- ✅ Console را برای خطاها بررسی کنید

**مشکل**: Cache قدیمی
- ✅ دکمه Refresh را کلیک کنید
- ✅ یا در Console: `localStorage.removeItem('github_projects_cache')`

**مشکل**: Rate Limit
- ✅ GitHub API بدون auth: 60 request/hour
- ✅ اگر بیشتر نیاز دارید، می‌توانید Personal Access Token اضافه کنید (در آینده)

---

**نکته**: بعد از تغییر `github.ts`، صفحه را refresh کنید تا تغییرات اعمال شوند.

