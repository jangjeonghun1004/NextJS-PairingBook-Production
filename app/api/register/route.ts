import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "필수 정보가 누락되었습니다." },
        { status: 400 }
      );
    }

    // 이메일 중복 확인
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "이미 사용 중인 이메일입니다." },
        { status: 400 }
      );
    }

    // 비밀번호 해시화
    const hashedPassword = await bcrypt.hash(password, 12);

    // 사용자 생성
    const user = await prisma.user.create({
      data: {
        name,
        email,
        hashedPassword,
      },
    });

    return NextResponse.json(
      { message: "회원가입이 완료되었습니다." + user.email },
      { status: 201 }
    );
  } catch (error) {
    console.error("회원가입 오류:", error);
    return NextResponse.json(
      { message: "회원가입 처리 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
} 